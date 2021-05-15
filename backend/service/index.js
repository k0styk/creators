'use strict';

const {getUser} = require('./users/getUser');
const {getCurrentUser} = require('./users/getCurrentUser');
const {editUser} = require('./users/editUser');
const {getPromoTypes} = require('./promo/getTypes');
const {getPromoSpheres} = require('./promo/getSpheres');


module.exports = {
    getUser,
    getCurrentUser,
    editUser,

    getPromoTypes,
    getPromoSpheres
};
