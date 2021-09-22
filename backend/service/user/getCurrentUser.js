const { getUser } = require('./getUser');

module.exports = {
    getCurrentUser: async ({ session, knex }) => {
        // console.log(test);
        // console.log(test.headers['authorization']);
        // const { user: { id } = {} } = session;
        // if (!id) {
        //     return;
        // }
        // return getUser({ params: { id }, knex });
    },
};
