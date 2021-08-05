const router = require('express').Router();

router.get('/users/get-current-user', async (req, res) => {
    console.log('HI');
    res.sendStatus(200);
});

module.exports = router;
