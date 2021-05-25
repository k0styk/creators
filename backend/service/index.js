'use strict';

const {getUser} = require('./users/getUser');
const {getCurrentUser} = require('./users/getCurrentUser');
const {editUser} = require('./users/editUser');
const {getPersonalPage} = require('./users/getPersonalPage');

const {getDataForCreate} = require('./promo/getDataForCreate');
const {createPromo} = require('./promo/createPromo');
const {upload} = require('./upload');

module.exports = {
    getUser,
    getCurrentUser,
    editUser,
    getPersonalPage,

    getDataForCreate,
    createPromo,

    upload
};
