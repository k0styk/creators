const router = require('express-promise-router')();
const {getMethod} = require('../controllers/api.controller');

router.get('/users/getUser/:id', getMethod(()=>'getUser'));
router.get('/users/getCurrentUser', getMethod(()=>'getCurrentUser'));
router.post('/users/editUser', getMethod(()=>'editUser'));
router.get('/users/getPersonalPage', getMethod(()=>'getPersonalPage'));
router.get('/users/getProfile/:id',getMethod(()=>'getProfile'));


router.get('/promos/getDataForCreate',getMethod(()=>'getDataForCreate'));
router.post('/promos/create', getMethod(()=>'createPromo'));
router.get('/promos/getParameters',getMethod(()=>'getParameters'));
router.get('/promos/getRecommendations', getMethod(()=>'getRecommendations'));
router.post('/promos/searchPromos',getMethod(()=>'searchPromos'));
router.get('/promos/getDataForCreate', getMethod(()=>'getDataForCreate'));
router.get('/promos/getPromo/:id', getMethod(()=>'getPromo'));

router.post('/upload', (query) => getMethod(()=>'upload'));

module.exports = router;
