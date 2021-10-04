const router = require('express-promise-router')();
const { getMethod } = require('../controllers/api.controller');
const authMiddleware = require('../middleware/auth');
const userController = require('../controllers/user');
const caseController = require('../controllers/case');

// router.get(
//     '/users/getUser/:id',
//     getMethod(() => 'getUser')
// );
// router.get(
//     '/users/getCurrentUser',
//     getMethod(() => 'getCurrentUser')
// );
router.get('/users/getUser/:id', userController.getUser);
router.get(
  '/users/getCurrentUser',
  authMiddleware,
  userController.getCurrentUser
);
// router.post(
//   '/users/editUser',
//   getMethod(() => 'editUser')
// );
router.post('/users/editUser', authMiddleware, userController.editUser);
// router.get(
//     '/users/getPersonalPage',
//     authMiddleware,
//     getMethod(() => 'getPersonalPage')
// );
router.get(
  '/users/getPersonalPage',
  authMiddleware,
  userController.getPersonalPage
);
// router.get(
//   '/users/getProfile/:id',
//   getMethod(() => 'getProfile')
// );
router.get('/users/getProfile/:id', authMiddleware, userController.getProfile);

// router.get(
//   '/cases/getDataForCreate',
//   getMethod(() => 'getDataForCreate')
// );
router.get(
  '/cases/getDataForCreate',
  authMiddleware,
  caseController.getDataForCreateCases
);
// router.post(
//   '/cases/create',
//   getMethod(() => 'createCase')
// );
router.post('/cases/create', authMiddleware, caseController.createCase);
// router.get(
//   '/cases/getParameters',
//   getMethod(() => 'getParameters')
// );
router.get('/cases/getParameters', caseController.getParameters);
// router.get(
//   '/cases/getRecommendations',
//   getMethod(() => 'getRecommendations')
// );
router.get(
  '/cases/getRecommendations',
  // authMiddleware,
  caseController.getRecommendations
);
// router.post(
//   '/cases/searchCases',
//   getMethod(() => 'searchCases')
// );
router.post('/cases/searchCases', caseController.searchCases);
// router.get(
//   '/cases/getDataForCreate',
//   getMethod(() => 'getDataForCreate')
// );
router.get(
  '/cases/getDataForCreate',
  authMiddleware,
  caseController.getDataForCreateCases
);
router.get('/cases/getCase/:id', caseController.getCase);

// router.post(
//   '/favorites/setFavorite',
//   getMethod(() => 'setFavorite')
// );
router.post(
  '/favorites/setFavorite',
  authMiddleware,
  userController.setFavorites
);
router.get(
  '/favorites/getFavorites',
  getMethod(() => 'getFavorites')
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
