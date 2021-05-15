'use strict';

const {getUser} = require('./users/getUser');
const {getCurrentUser} = require('./users/getCurrentUser');
const {editUser} = require('./users/editUser');
const {getDataForCreate} = require('./promo/getDataForCreate');
const {createPromo} = require('./promo/createPromo');

module.exports = {
    getUser,
    getCurrentUser,
    editUser,

    getDataForCreate,
    createPromo
};
