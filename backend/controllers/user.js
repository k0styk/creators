// const knex = require('../knex');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// exports.register = async (req, res) => {
//     try {
//         const { email, password, roleTypeId } = req.body;

//         const hashPassword = await bcrypt.hash(
//             password,
//             process.env['PASSWORD_SALT'] || 10
//         );
//         await knex('users').insert({
//             email,
//             password: hashPassword,
//             type: roleTypeId,
//         });

//         await this.login(req, res);
//     } catch (err) {
//         res.sendStatus(500);
//         console.error('Register error');
//         console.log(err);
//         throw err;
//     }
// };

// exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const candidate = await knex('users')
//             .first(['password', 'id', 'type'])
//             .where('email', email);

//         console.log(candidate);

//         if (!candidate) {
//             console.log('not found');
//             return res
//                 .status(404)
//                 .location('/auth/login')
//                 .send({ message: 'User Not found.' });
//         }

//         const passwordIsValid = await bcrypt.compare(
//             password,
//             candidate.password
//         );

//         if (!passwordIsValid) {
//             console.log('not valid');
//             return res
//                 .status(401)
//                 .location('/auth/login')
//                 .send({ message: 'Wrong credentials' });
//         }

//         const token = jwt.sign(
//             { id: candidate.id },
//             process.env['JWT_SECRET'],
//             {
//                 expiresIn: 60 * 60 * 24 * 7, // seconds*minutes*hours*days
//             }
//         );

//         req.session.user = candidate;
//         req.session.accessToken = token;
//         req.session.isAuthenticated = true;

//         res.status(200).send({
//             id: candidate.id,
//             email: candidate.email,
//             roleTypeId: candidate.type,
//             accessToken: token,
//         });
//     } catch (err) {
//         res.sendStatus(500);
//         console.error('Login error');
//         console.log(err);
//         throw err;
//     }
// };

const userService = require('../service/user/user');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token');

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          ApiError.BadRequest('Ошибка при валидации', errors.array())
        );
      }
      const { email, password, roleTypeId } = req.body;
      const userData = await userService.registration(
        email,
        password,
        roleTypeId
      );
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie('refreshToken');
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async getUser(req, res, next) {
    try {
      const { id } = req.user;
      const user = await userService.getUser(id);
      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async editUser(req, res, next) {
    const { firstName, about, lastName, secondName, photoPath, city } =
      req.body;
    const { user: { id } = {} } = req;
    try {
      const result = await userService.editUser({
        firstName,
        about,
        lastName,
        secondName,
        photoPath,
        city,
        userId: id,
      });
      return res.json({ message: 'OK' });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getCurrentUser(req, res, next) {
    try {
      if (req.user.id) {
        const user = await userService.getUser(req.user.id);
        return res.json(user);
      } else {
        return res.json({ message: 'user id not provided' });
      }
    } catch (e) {
      next(e);
    }
  }

  async getPersonalPage(req, res, next) {
    try {
      const { user } = req;
      const data = await userService.getPersonalPage(user.id);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async setFavorites(req, res, next) {
    try {
      const {
        user,
        body: { caseId, action },
      } = req;
      const data = await userService.setFavorites(user.id, caseId, action);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async getFavorites(req, res, next) {
    try {
      const { user } = req;
      const data = await userService.getFavorites(user.id);

      return res.json(data);
    } catch (e) {
      next(e);
    }
  }

  async getProfile(req, res, next) {
    try {
      const { id } = req.params;

      const data = await userService.getPersonalPage(id);
      const result = {
        sumPrice: data.sumPrice,
        spheres: data.spheres,
        cases: data.cases,
        casesCount: data.casesCount,
        ...data.user,
      };
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
