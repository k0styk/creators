'use strict';

const {getUser} = require('./user/getUser');
const {getCurrentUser} = require('./user/getCurrentUser');
const {editUser} = require('./user/editUser');
const {getPersonalPage} = require('./user/getPersonalPage');
const {getProfile} = require('./user/getProfile');

const {getDataForCreate} = require('./case/getDataForCreate');
const {createCase} = require('./case/createCase');
const {getParameters} = require('./case/getParameters');
const {getRecommendations} = require('./case/getRecommendations');
const {searchCases} = require('./case/searchCases');
const {getCase} = require('./case/getCase');

const {upload} = require('./upload');

module.exports = {
    getUser,
    getCurrentUser,
    editUser,
    getPersonalPage,

    getDataForCreate,
    createCase,
    getParameters,
    getRecommendations,
    searchCases,
    getCase,
    getProfile,

    upload
};
