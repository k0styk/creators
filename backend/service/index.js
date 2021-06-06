'use strict';

const {getUser} = require('./users/getUser');
const {getCurrentUser} = require('./users/getCurrentUser');
const {editUser} = require('./users/editUser');
const {getPersonalPage} = require('./users/getPersonalPage');

const {getDataForCreate} = require('./promo/getDataForCreate');
const {createPromo} = require('./promo/createPromo');
const {getParameters} = require('./promo/getParameters');
const {getRecommendations} = require('./promo/getRecommendations');
const {searchPromos} = require('./promo/searchPromos');
const {getPromo} = require('./promo/getPromo');
const {getProfile} = require('./users/getProfile');

const {upload} = require('./upload');

module.exports = {
    getUser,
    getCurrentUser,
    editUser,
    getPersonalPage,

    getDataForCreate,
    createPromo,
    getParameters,
    getRecommendations,
    searchPromos,
    getPromo,
    getProfile,

    upload
};
