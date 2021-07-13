const {
    getUser,
    getUserCountCases,
    getUserCases,
    getUserSphereTypes
} = require('./tools/queries');
const {userType} = require('../../enums');

module.exports = {
    getPersonalPage: async ({session, knex}) => {
        const {user: {id: userId} = {}} = session;
        const user = await getUser(knex, userId, [
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
            ) as city`)
        ]).catch(err => console.log(err));

        if (!user) {
            return {};
        }

        if (user.type === userType.CREATOR) {
            const [spheres, cases, casesCount] = await Promise.all([
                getUserSphereTypes(knex, userId),
                getUserCases(knex, userId),
                getUserCountCases(knex, userId)
            ]);

            return {
                user,
                spheres,
                cases,
                casesCount: casesCount && casesCount.count || 0
            };
        }

        return {
            user,
            activeCases: [],
            completedCases: [],
        };
    }
};
