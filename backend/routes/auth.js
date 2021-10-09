const Router = require('express').Router;
const { body } = require('express-validator');
const userController = require('../controllers/user');
const router = new Router();

// TODO: need to parse auth and user

router.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 32 }),
  userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);

// router.get('/password/:token', userController.makeResetPassword);
// router.post('/reset', userController.createResetPassword);

module.exports = router;
