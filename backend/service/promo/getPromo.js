const {searchPromos} = require('./searchPromos');

module.exports = {
    getPromo: async ({params, knex}) => {
        const {id} = params;
        const [promo, services] = await Promise.all([
            knex("promos")
                .first([
                    'promos.id',
                    'title',
                    'youtubeId',
                    'desc',
                    'photoPath',
                    'cities.name as city',
                    'promoTypes.name as type',
                    'sphereTypes.name as sphere'
                ])
                .select(knex.raw(`
                    json_build_object(
                         'id', "users"."id",
                        'firstName', "firstName",
                        'lastName',  "lastName",
                        'secondName', "secondName",
                        'photoPath', "photoPath"
                    ) as user`))
                .select(knex.raw(`
                    json_build_object(
                        'days', "productionTimeDays",
                        'hours',  "productionTimeHours",
                        'minutes', "productionTimeMinutes"
                    ) as "productionTime"`))
                .leftJoin('users', 'users.id', 'userId')
                .leftJoin('sphereTypes', 'sphereTypes.id', 'sphereId')
                .leftJoin('promoTypes', 'promoTypes.id', 'typeId')
                .leftJoin('cities', 'cities.id', 'promos.cityId')
                .where('promos.id', id),

            knex("promosServices")
                .select([
                    'promosServices.id',
                    'name',
                    'tooltipText',
                    'tooltipAdditional',
                    'price',
                    'type'
                ])
                .leftJoin('services', 'services.id', 'serviceId')
                .where('promoId', id)
        ]);

        if (!promo) {
            return {};
        }
        const userPromos = await searchPromos({
            body: {
                userId: promo.user && promo.user.id,
                limit: 4
            },
            knex
        });
        return {...promo, services, userPromos};
    }
};
