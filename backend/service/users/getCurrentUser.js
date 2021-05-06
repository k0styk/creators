const {getUser} = require("./getUser");

const jwt = require("jsonwebtoken");
const {secretKey} = require('../../config');

module.exports = {
    getCurrentUser: async ({params, knex}) => {

        const bearerHeader = params.headers['authorization'];
        const token = bearerHeader.split(' ');
        const id = jwt.verify(token[1], secretKey);

        return getUser({params: id, knex});
    }
};
