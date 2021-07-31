const {searchCases} = require("../case/searchCases");

module.exports = {
    getFavorites: async ({knex, session}) => {
        return searchCases({body: {onlyFavorites: true}, session, knex});
    }
};
