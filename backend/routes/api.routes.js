const router = require('express-promise-router')();
const apiController = require('../controllers/api.controller');

router.get('/api', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'Started!',
        version: '1.0.0',
    });
});

router.get('/users/getUser/:id', apiController.getUser);
router.get('/users/getCurrentUser', apiController.getCurrentUser);
router.put('/users/editUser', apiController.editUser);

router.get('/promos/getTypes', apiController.getPromoTypes);
router.get('/promos/getSpheres', apiController.getPromoSpheres);
module.exports = router;
