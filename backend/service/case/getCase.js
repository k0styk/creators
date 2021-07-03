const {searchCases} = require('./searchCases');

module.exports = {
    getCase: async ({params, knex}) => {
        const {id} = params;
        const [caseCard, services] = await Promise.all([
            knex("cases")
                .first([
                    'cases.id',
                    'title',
                    'youtubeId',
                    'description',
                    'photoPath',
                    'productionTime',
                    'cities.name as city',
                    'caseTypes.name as type',
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
                .leftJoin('users', 'users.id', 'userId')
                .leftJoin('sphereTypes', 'sphereTypes.id', 'sphereId')
                .leftJoin('caseTypes', 'caseTypes.id', 'typeId')
                .leftJoin('cities', 'cities.id', 'cases.cityId')
                .where('cases.id', id),

            knex("casesServices")
                .select([
                    'casesServices.id',
                    'name',
                    'tooltipText',
                    'tooltipAdditional',
                    'tooltipAdditionalType',
                    'price',
                    'type'
                ])
                .leftJoin('services', 'services.id', 'serviceId')
                .where('caseId', id)
        ]);

        if (!caseCard) {
            return {};
        }
        const userCases = await searchCases({
            body: {
                userId: caseCard.user && caseCard.user.id,
                limit: 4
            },
            knex
        });
        return {...caseCard, services, userCases};
    }
};
