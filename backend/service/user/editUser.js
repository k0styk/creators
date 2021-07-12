module.exports = {
    editUser: async ({body, session, knex}) => {
        const {firstName, about, lastName, secondName, photoPath} = body;
        const {user: {id} = {}} = session;
        try {
            await knex("users")
                .update({
                    firstName,
                    about,
                    lastName,
                    secondName,
                    photoPath
                })
                .where('users.id', id);
            return {status: 200};
        } catch (error) {
            console.log(e);
            return error;
        }
    }
};
