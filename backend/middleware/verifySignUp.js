const knex = require('../knex');

checkDuplicateEmail = async (req, res, next) => {
    const { email } = req.body;
    const emailRegexp =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/; // eslint-disable-line

    if (!emailRegexp.test(email)) {
        return res.status(400).send({ message: 'Email validate error.' });
    }

    const candidate = await knex('users').first().where('email', email);

    if (candidate) {
        return res.status(400).send({
            message: 'User with same email already exits.',
        });
    }

    next();
};

checkPassword = async (req, res, next) => {
    const { password } = req.body;

    if (password.length < 6) {
        // need strong validation
        return res.status(400).json({
            message: 'Password must be atleast 6 characters long.',
        });
    }
    next();
};

const verifySignUp = {
    checkDuplicateEmail,
    checkPassword,
};

module.exports = verifySignUp;
