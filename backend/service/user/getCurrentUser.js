const {getUser} = require("./getUser");

module.exports = {
    getCurrentUser: async ({params, session, knex}) => {
        const {user: {id} = {}} = session;

        return getUser({params: {id}, knex});
    }
};
