module.exports = {
    getUser: async ({params, knex}) => {
        const {id} = params;

        console.log(id);

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
        console.log(user);
        if (user) {
            return user;
        }

        return;
    }
};
