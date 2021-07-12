const knex = require('../knex');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const {email, password, roleTypeId} = req.body;

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
        res.redirect(200, '/auth/login');
    } catch (err) {
        console.error('Register error');
        console.log(err);
        throw err;
    }
};

exports.login = async (req, res) => {
    console.log(12);
    try {
        const { email, password} = req.body;
        const candidate = await knex('users')
            .first(['password', 'id', 'type'])
            .where('email', email);

        if (!candidate) {
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

        req.session.save((err) => {
            if (err) {
                throw err;
            }
            res.status(200).send({
                id: candidate.id,
                email: candidate.email,
                roleTypeId: candidate.type,
                accessToken: token,
            });
        });
    } catch (err) {
        console.error('Login error');
        console.log(err);
        throw err;
    }
};
