const {
    getUser,
    getUserCountCases,
    getUserCases,
    getUserSphereTypes,
    getUserSumPrice,
} = require('./tools/queries');
const { userType } = require('../../enums');
const { searchCases } = require('../case/searchCases');

module.exports = {
    getPersonalPage: async ({ user, knex }) => {
        const usr = await getUser(knex, user.id, [
            'users.type',
            'users.id',
            'firstName',
            'phone',
            'lastName',
            'secondName',
            'email',
            'about',
            'photoPath',
            knex.raw(`(
            CASE WHEN "cityId" IS NOT NULL
                 THEN json_build_object('name', cities.name, 'id', cities.id)
                 ELSE NULL
             END
            ) as city`),
        ]).catch((err) => console.log(err));

        if (!usr) {
            return {};
        }

        if (usr.type === userType.CREATOR) {
            const [spheres, cases, casesCount, sumPrice] = await Promise.all([
                getUserSphereTypes(knex, userId),
                searchCases({ body: { userId }, knex }),
                getUserCountCases(knex, userId),
                getUserSumPrice(knex, userId),
            ]);

            return {
                ...sumPrice,
                usr,
                spheres,
                cases,
                casesCount: (casesCount && casesCount.count) || 0,
            };
        }

        return {
            usr,
            activeCases: [],
            completedCases: [],
        };
    },
};
