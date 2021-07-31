const router = require('express-promise-router')();
const {getMethod} = require('../controllers/api.controller');

router.get('/users/getUser/:id', getMethod(()=>'getUser'));
router.get('/users/getCurrentUser', getMethod(()=>'getCurrentUser'));
router.post('/users/editUser', getMethod(()=>'editUser'));
router.get('/users/getPersonalPage', getMethod(()=>'getPersonalPage'));
router.get('/users/getProfile/:id',getMethod(()=>'getProfile'));


router.get('/cases/getDataForCreate',getMethod(()=>'getDataForCreate'));
router.post('/cases/create', getMethod(()=>'createCase'));
router.get('/cases/getParameters',getMethod(()=>'getParameters'));
router.get('/cases/getRecommendations', getMethod(()=>'getRecommendations'));
router.post('/cases/searchCases', getMethod(()=>'searchCases'));
router.get('/cases/getDataForCreate', getMethod(()=>'getDataForCreate'));
router.get('/cases/getCase/:id', getMethod(()=>'getCase'));

router.post('/favorites/setFavorite', getMethod(()=>'setFavorite'));
router.get('/favorites/getFavorites', getMethod(()=>'getFavorites'));

router.post('/upload', getMethod(()=>'upload'));

module.exports = router;
