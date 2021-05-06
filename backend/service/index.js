'use strict';

const {getUser} = require('./users/getUser');
const {getCurrentUser} = require('./users/getCurrentUser');
const {editUser} = require('./users/editUser');

module.exports = {
    getUser,
    getCurrentUser,
    editUser
};
