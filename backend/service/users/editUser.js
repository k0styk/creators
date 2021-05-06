const {getCurrentUser} = require("./getCurrentUser");
const {hashPassword, verifyPassword} = require("../../auth");

module.exports = {
    editUser: async({params, knex}) => {
        const response = {};
        const {body} = params;
        const {id} = await getCurrentUser({params, knex});

        if(body.oldPassword && body.newPassword){   
            const {password: oldPassword} = await knex("users")
                .first('password')
                .where('users.id', id);
            const isVerified = await verifyPassword(body.oldPassword, oldPassword);
            if(isVerified) {
                body.password = await hashPassword(body.newPassword);
            } else return {status: 400};
        }

        delete body.newPassword;
        delete body.oldPassword;

        const results = await knex("users")
            .update(body)
            .where('users.id', id)
            .catch(error => {
                console.log(error);
                response.status = 500;
                response.message = error;
            });

        if(!results) return response;
        else response.status = 200;

        return response;
    }
};
