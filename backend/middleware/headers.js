module.exports = function (req, res, next) {
    // maybe bad and not good
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    );
    next();
};
