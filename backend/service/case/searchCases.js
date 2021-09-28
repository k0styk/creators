const { serviceType } = require('../../enums');

module.exports = {
  searchCases: async ({ body, session, knex }) => {
    const {
      type,
      sphere,
      price,
      userId,
      fastFilter,
      onlyFavorites,
      limit,
      time,
    } = body;
    const { user: { id: userIdCurrent } = {} } = session || {};

    const subQuery = knex('cases')
      .select([
        'cases.id',
        'title',
        'cases.created_at as createdAt',
        'youtubeId',
        'sphereTypes.name as sphere',
        'caseTypes.name as type',
        'cases.created_at as createdAt',
        knex.raw('sum(price) as price'),
        knex.raw(
          `COALESCE(json_agg(services.name) FILTER (WHERE services.name IS NOT NULL), '[]')  as services`
        ),
      ])
      .select(
        knex.raw(`
                    json_build_object(
                        'id', "users"."id",
                        'firstName', "firstName",
                        'photoPath', "photoPath"
                    ) as user`)
      )
      .leftJoin('users', 'userId', 'users.id')
      .leftJoin('casesServices', 'casesServices.caseId', 'cases.id')
      .leftJoin('services', 'services.id', 'casesServices.serviceId')
      .leftJoin('caseTypes', 'caseTypes.id', 'cases.typeId')
      .leftJoin('sphereTypes', 'sphereTypes.id', 'cases.sphereId')
      .as('table')
      .groupBy(['cases.id', 'users.id', 'caseTypes.name', 'sphereTypes.name']);

    if (limit) {
      subQuery.limit(limit);
    }

    if (userId) {
      subQuery.where('cases.userId', userId);
    }

    if (onlyFavorites) {
      console.log('ONLY FAVORITES: ', onlyFavorites);
      subQuery
        .select(knex.raw(`favorites."caseId" as "inFavorite"`))
        .join('favorites', function () {
          this.on(function () {
            this.on('favorites.userId', '=', userIdCurrent);
            this.andOn('favorites.caseId', '=', 'cases.id');
          });
        })
        .groupBy('favorites.caseId');
    }

    if (!onlyFavorites && userIdCurrent) {
      console.log('!ONLY FAVORITES: ', onlyFavorites, userIdCurrent);
      subQuery
        .select(knex.raw(`favorites."caseId" as "inFavorite"`))
        .leftJoin('favorites', function () {
          this.on(function () {
            this.on('favorites.userId', '=', userIdCurrent);
            this.andOn('favorites.caseId', '=', 'cases.id');
          });
        })
        .groupBy('favorites.caseId');
    }

    if (type) {
      subQuery.where('typeId', type);
    }

    if (sphere) {
      subQuery.where('sphereId', sphere);
    }

    if (fastFilter) {
      const text = fastFilter.trim().replace(/[ ]+/g, ' ').split(' ');
      if (text.length) {
        const orFilter = `"word" % to_tsquery('russian', ?)::text`;
        const whereRaw = `"tsvector" @@ (SELECT lemma FROM documents)::tsquery`;

        subQuery
          .with('documents', (qb) => {
            qb.select(
              knex.raw(`string_agg(format('''%s''', word), ' | ') as lemma `)
            ).from('documents');

            text.forEach((word) => {
              qb.orWhereRaw(orFilter, word);
            });
          })
          .whereRaw(whereRaw);
      }
    }

    if (price) {
      if (Number(price.to)) {
        subQuery.havingRaw('sum(price) <= ?', Number(price.to));
      }
      if (Number(price.from)) {
        subQuery.havingRaw('sum(price) >= ?', Number(price.from));
      }
    }

    if (time) {
      if (Number(time.to)) {
        subQuery.where('time', '<', Number(time.to));
      }
      if (Number(time.from)) {
        subQuery.where('time', '>', Number(time.from));
      }
    }

    return subQuery;
  },
};
