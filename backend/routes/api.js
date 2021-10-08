const router = require('express-promise-router')();
const { getMethod } = require('../controllers/api.controller');
const authMiddleware = require('../middleware/auth');
const nonStrictAuthMiddleware = require('../middleware/nonStrictAuth');
const userController = require('../controllers/user');
const caseController = require('../controllers/case');

router.get('/users/getUser/:id', userController.getUser);
router.get(
  '/users/getCurrentUser',
  authMiddleware,
  userController.getCurrentUser
);
router.post('/users/editUser', authMiddleware, userController.editUser);
router.get(
  '/users/getPersonalPage',
  authMiddleware,
  userController.getPersonalPage
);
router.get('/users/getProfile/:id', authMiddleware, userController.getProfile);

router.get(
  '/cases/getDataForCreate',
  authMiddleware,
  caseController.getDataForCreateCases
);
router.post('/cases/create', authMiddleware, caseController.createCase);
router.get('/cases/getParameters', caseController.getParameters);
router.get(
  '/cases/getRecommendations',
  nonStrictAuthMiddleware,
  caseController.getRecommendations
);
router.post(
  '/cases/searchCases',
  nonStrictAuthMiddleware,
  caseController.searchCases
);
router.get(
  '/cases/getDataForCreate',
  authMiddleware,
  caseController.getDataForCreateCases
);
router.get('/cases/getCase/:id', caseController.getCase);

// TODO: make setFavorite uniq, filter repeating value
router.post(
  '/favorites/setFavorite',
  authMiddleware,
  userController.setFavorites
);
router.get(
  '/favorites/getFavorites',
  authMiddleware,
  userController.getFavorites
);

router.post(
  '/upload',
  getMethod(() => 'upload')
);

router.post(
  '/chat/create',
  getMethod(() => 'createChat')
);

module.exports = router;
