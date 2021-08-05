const knex = require('../knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { email, password, roleTypeId } = req.body;

        const hashPassword = await bcrypt.hash(
            password,
            process.env['PASSWORD_SALT'] || 10
        );
        await knex('users').insert({
            email,
            password: hashPassword,
            type: roleTypeId,
        });

        await this.login(req, res);
    } catch (err) {
        res.sendStatus(500);
        console.error('Register error');
        console.log(err);
        throw err;
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const candidate = await knex('users')
            .first(['password', 'id', 'type'])
            .where('email', email);

        console.log(candidate);

        if (!candidate) {
            console.log('not found');
            return res
                .status(404)
                .location('/auth/login')
                .send({ message: 'User Not found.' });
        }

        const passwordIsValid = await bcrypt.compare(
            password,
            candidate.password
        );

        if (!passwordIsValid) {
            console.log('not valid');
            return res
                .status(401)
                .location('/auth/login')
                .send({ message: 'Wrong credentials' });
        }

        const token = jwt.sign(
            { id: candidate.id },
            process.env['JWT_SECRET'],
            {
                expiresIn: 60 * 60 * 24 * 7, // seconds*minutes*hours*days
            }
        );

        req.session.user = candidate;
        req.session.accessToken = token;
        req.session.isAuthenticated = true;

        res.status(200).send({
            id: candidate.id,
            email: candidate.email,
            roleTypeId: candidate.type,
            accessToken: token,
        });
    } catch (err) {
        res.sendStatus(500);
        console.error('Login error');
        console.log(err);
        throw err;
    }
};
