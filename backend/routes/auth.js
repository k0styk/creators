const Router = require('express').Router;
const { body } = require('express-validator');
const authController = require('../controllers/auth');
const router = new Router();

router.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 32 }),
  authController.registration
);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/activate/:link', authController.activate);
router.get('/refresh', authController.refresh);

// router.get('/password/:token', userController.makeResetPassword);
// router.post('/reset', userController.createResetPassword);

module.exports = router;
