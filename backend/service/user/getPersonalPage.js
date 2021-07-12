const {
    getUser,
    getUserCountCases,
    getUserCases,
    getUserSphereTypes
} = require('./tools/queries');

module.exports = {
    getPersonalPage: async ({session, knex}) => {

        const {user: {id: userId} = {}} = session;

        console.log(userId);

        const [user, spheres, cases, casesCount] = await Promise.all([
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
            getUserCases(knex, userId),
            getUserCountCases(knex, userId)
        ]);

        if (user) {
            return {
                user,
                spheres,
                cases,
                casesCount: casesCount && casesCount.count || 0
            };
        }

        return;
    }
};
