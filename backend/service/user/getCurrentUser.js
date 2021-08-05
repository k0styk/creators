const { getUser } = require('./getUser');

module.exports = {
    getCurrentUser: async ({ session, knex }) => {
        const { user: { id } = {} } = session;
        if (!id) {
            return;
        }
        return getUser({ params: { id }, knex });
    },
};
