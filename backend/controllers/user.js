const userService = require('../service/user/user');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token');

// TODO: need to parse auth and user
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
    const { firstName, about, lastName, secondName, photoPath, city, phone } =
      req.body;
    const { user: { id } = {} } = req;
    try {
      const result = await userService.editUser({
        phone,
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

  // TODO: End make reset password
  async makeResetPassword(req, res, next) {
    if (!req.params.token) {
      return res.redirect('/auth/login');
    }

    try {
      const user = await User.findOne({
        resetToken: req.params.token,
        resetTokenExp: { $gt: Date.now() },
      });

      if (!user) {
        return res.redirect('/auth/login');
      } else {
        res.render('auth/password', {
          title: 'Восстановить доступ',
          error: req.flash('error'),
          userId: user._id.toString(),
          token: req.params.token,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  // TODO: End create reset password
  async createResetPassword(req, res, next) {
    try {
      crypto.randomBytes(32, async (err, buffer) => {
        if (err) {
          req.flash('error', 'Что-то пошло не так, повторите попытку позже');
          return res.redirect('/auth/reset');
        }

        const token = buffer.toString('hex');
        const candidate = await User.findOne({ email: req.body.email });

        if (candidate) {
          candidate.resetToken = token;
          candidate.resetTokenExp = Date.now() + 60 * 60 * 1000;
          await candidate.save();
          await transporter.sendMail(resetEmail(candidate.email, token));
          res.redirect('/auth/login');
        } else {
          req.flash('error', 'Такого email нет');
          res.redirect('/auth/reset');
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new UserController();
