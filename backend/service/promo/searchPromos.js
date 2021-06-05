const {serviceType} = require('../../enums');

module.exports = {
    searchPromos: async ({body, knex}) => {
        const {
            type,
            sphere,
            time,
            price,
            userId,
            limit = 10
        } = body;

        const subQuery1 = knex.raw('(select sum(price) from "promosServices" where "promoId" = promos.id) as price');
        const subQuery2 = knex("promos").select([
            'promos.id',
            'title',
            'firstName',
            'promos.created_at as createdAt',
            'youtubeId',
            'photoPath',
            subQuery1
        ])
            .leftJoin('users', 'userId', 'users.id')
            .as('table')
            .limit(limit);

        const query = knex.select().from(subQuery2);

        if (userId) {
            subQuery2.where('promos.userId', userId);
        }

        if (type) {
            subQuery2.where('typeId', type);
        }

        if (sphere) {
            subQuery2.where('sphereId', sphere);
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
