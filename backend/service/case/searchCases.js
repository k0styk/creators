const {serviceType} = require('../../enums');

module.exports = {
    searchCases: async ({body, knex}) => {
        const {
            type,
            sphere,
            time,
            price,
            userId,
            fastFilter,
            limit = 10
        } = body;

        const subQuery1 = knex.raw('(select sum(price) from "casesServices" where "caseId" = cases.id) as price');
        const subQuery2 = knex("cases").select([
            'cases.id',
            'title',
            'cases.created_at as createdAt',
            'youtubeId',
            subQuery1
        ])
            .select(knex.raw(`
                    json_build_object(
                        'id', "users"."id",
                        'firstName', "firstName",
                        'photoPath', "photoPath"
                    ) as user`))
            .leftJoin('users', 'userId', 'users.id')
            .as('table')
            .limit(limit);

        const query = knex.select().from(subQuery2);

        if (userId) {
            subQuery2.where('cases.userId', userId);
        }

        if (type) {
            subQuery2.where('typeId', type);
        }

        if (sphere) {
            subQuery2.where('sphereId', sphere);
        }

        if (fastFilter) {
            const sql = `"tsvector" @@ replace(to_tsquery('russian', ?)::text, '&', '|')::tsquery`;

            subQuery2.whereRaw(sql, `'${fastFilter}':*`);
        }

        if (price) {
            if (price.to) {
                query.whereRaw('price <= ?', Number(price.to));
            }
            if (price.from) {
                query.andWhere('price', '>=', Number(price.from));
            }
        }

        return query;
    }
};
