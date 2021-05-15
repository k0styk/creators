const knex = require("../knex/index");
const {
    getUser,
    getCurrentUser,
    editUser,
    getDataForCreate,
    createPromo
} = require('../service');

const promiseFn = (fn, res, params) => new Promise((resolve) => fn({params, knex}).then((data) => {
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
    getUser: ({params}, res) => promiseFn(getUser, res, params),
    getCurrentUser: (params, res) => promiseFn(getCurrentUser, res, params),
    editUser: (params, res) => promiseFn(editUser, res, params),

    getDataForCreate: (_, res) => promiseFn(getDataForCreate, res, knex),
    createPromo: ({body}, res) => promiseFn(createPromo, res, body)
};
