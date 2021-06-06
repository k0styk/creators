const {
    getUser,
    getUserCountCases,
    getUserCases,
    getUserSphereTypes,
    getUserSumPrice
} = require('./tools/queries');

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
            getUserCases(knex, userId),
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
