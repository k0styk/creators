const {
    getUser,
    getUserCountCases,
    getUserSphereTypes,
    getUserSumPrice
} = require('./tools/queries');
const {searchCases} = require("../case/searchCases");

module.exports = {
    getProfile: async ({params: {id: userId}, knex}) => {
        const [user, spheres, cases, casesCount, sumPrice] = await Promise.all([
            getUser(knex, userId, [
                'users.id',
                'firstName',
                'lastName',
                'secondName',
                'about',
                'cityId',
                'photoPath',
                'cities.name as city'
            ]),
            getUserSphereTypes(knex, userId),
            searchCases({body: {userId}, knex}),
            getUserCountCases(knex, userId),
            getUserSumPrice(knex, userId)
        ]);

        if (user) {
            return {
                ...user,
                ...sumPrice,
                spheres,
                cases,
                casesCount: casesCount && casesCount.count || 0,

            };
        }

        return;
    }
};
