const router = require('express-promise-router')();
const {getMethod} = require('../controllers/api.controller');

router.get('/users/getUser/:id', (query) => getMethod('getUser', query));
router.get('/users/getCurrentUser',(query) => getMethod('getCurrentUser', query));
router.post('/users/editUser', (query) => getMethod('editUser', query));
router.get('/users/getPersonalPage',(query) => getMethod('getPersonalPage', query));

router.get('/promos/getDataForCreate',(query) => getMethod('getDataForCreate', query));
router.post('/promos/create', (query) => getMethod('createPromo', query));

router.post('/upload', (query) => getMethod('upload', query));

module.exports = router;
