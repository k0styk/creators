// const router = require('express-promise-router')();
const { getMethod } = require('../controllers/api.controller');
const router = require('express').Router();
const authMiddleware = require('../middleware/auth');
const nonStrictAuthMiddleware = require('../middleware/nonStrictAuth');
const userController = require('../controllers/user');
const caseController = require('../controllers/case');
const chatController = require('../controllers/chat');
const apiController = require('../controllers/api.controller');

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log('Time: ', Date.now());
//   next();
// });

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

router.post('/upload', authMiddleware, apiController.upload);

router.get('/chat/:id', authMiddleware, chatController.checkRights);
router.post('/chat/create', authMiddleware, chatController.createChat);

module.exports = router;
