module.exports = {
    getUser: async ({params, knex}) => {
        const {id} = params;
        const user = await knex("users")
            .first([
                'users.id',
                'firstName',
                'lastName',
                'secondName',
                'email',
                'about',
                'cityId',
                'photoPath',
            ])
            .where('users.id', id);

        if (user) {
            return user;
        }

        return;
    }
};
