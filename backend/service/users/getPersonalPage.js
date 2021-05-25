module.exports = {
    getPersonalPage: async ({params, knex}) => {

        const userId = 1;

        const [user, spheres, promos, promosCount] = await Promise.all([
            knex("users")
                .first([
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
                ])
                .leftJoin('cities','cities.id', 'cityId')
                .where('users.id', userId),
            knex("sphereTypes")
                .distinct('sphereTypes.id')
                .pluck('name')
                .join('promos', 'promos.sphereId', 'sphereTypes.id')
                .where('promos.userId', userId),
            knex("promos")
                .select()
                .where('promos.userId', userId),
            knex("promos")
                .count()
                .first()
                .where('promos.userId', userId),
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
