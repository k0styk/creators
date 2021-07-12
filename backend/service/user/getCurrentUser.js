const {getUser} = require("./getUser");

module.exports = {
    getCurrentUser: async ({params, session, knex}) => {
        const {user: {id} = {}} = session;
        if (!id) {
            return;
        }
        return getUser({params: {id}, knex});
    }
};
