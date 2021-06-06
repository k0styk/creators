const {
    getUser,
    getUserCountPromos,
    getUserPromos,
    getUserSphereTypes
} = require('./tools/queries');

module.exports = {
    getPersonalPage: async ({params, knex}) => {

        const userId = 1;

        const [user, spheres, promos, promosCount] = await Promise.all([
            getUser(knex, userId, [
                'users.id',
                'firstName',
                'phone',
                'lastName',
                'secondName',
                'email',
                'about',
                'cityId',
                'photoPath',
                'cities.name as city'
            ]),
            getUserSphereTypes(knex, userId),
            getUserPromos(knex, userId),
            getUserCountPromos(knex, userId)
        ]);

        if (user) {
            return {
                user,
                spheres,
                promos,
                promosCount: promosCount && promosCount.count || 0
            };
        }

        return;
    }
};
