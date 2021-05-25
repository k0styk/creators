const knex = require("../knex/index");
const service = require('../service');

const promiseFn = (fn, {res, params, body, files}) => new Promise((resolve) =>
    fn({params, knex, body, files}).then((data) => {
        if (data) {
            data.status && res.status(data.status);
            if (data.message) {
                return res.json(data.message);
            }

            return res.json(data);
        } else {
            return res.json({message: 'error', status: 500});
        }
    }));

module.exports = {
    getMethod: (methodName, query) => promiseFn(service[methodName], query)
};
