const userService = require('../service/user/user');

class UserController {
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

  // TODO: End send activation email again
}

module.exports = new UserController();
