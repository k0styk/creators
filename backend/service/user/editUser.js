const {getCurrentUser} = require("./getCurrentUser");
const {hashPassword, verifyPassword} = require("../../auth");

module.exports = {
    editUser: async ({body, knex}) => {
        const {firstName, about, lastName, secondName, photoPath} = body;
        const userId = 1;
        // const {id} = await getCurrentUser({params, knex});


        try {
            await knex("users")
                .update({
                    firstName,
                    about,
                    lastName,
                    secondName,
                    photoPath
                })
                .where('users.id', userId);
            return {status: 200};
        } catch (error) {
            console.log(e);
            return error;
        }
    }
};
