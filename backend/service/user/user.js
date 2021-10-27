const uuid = require('uuid');
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
const UserModel = require('../../models/user');
const CaseModel = require('../../models/cases');
const { userType } = require('../../models/helper');
const mailService = require('../mail/mail');
const { ShortUser, User } = require('../../dtos/user');
const { SphereAggregateDto } = require('../../dtos/seed');
const ApiError = require('../../exceptions/api-error');
const AuthError = require('../../exceptions/auth-error');
const tokenService = require('../token');
const caseService = require('../case/case');
const { getPersonalPage, searchCases } = require('../aggregations');

class UserService {
  async registration(email, password, roleTypeId) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      if (
        !candidate.isActivated &&
        candidate.activationLinkExpiration > new Date()
      ) {
        throw ApiError.BadRequest(
          `Пользователь с почтовым адресом ${email} уже существует`
        );
      } else {
        this.deleteUserAfterExpiration(candidate['_id']);
      }
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      type: roleTypeId,
      activationLink,
    });
    if (process.env['NODE_ENV'] === 'production') {
      await mailService.sendActivationMail(
        email,
        `${process.env.ORIGIN}/auth/activate/${activationLink}`
      );
    }

    const userDto = new ShortUser(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest('Неккоректная ссылка активации');
    }
    if (user.activationLinkExpiration < new Date()) {
      await this.deleteUserAfterExpiration(user['_id']);
      throw ApiError.BadRequest('Время ссылки активации истекло');
    }

    user.isActivated = true;
    await user.save();
  }

  async deleteUserAfterExpiration(id) {
    // FIXME: delete user after expiration
    // await UserModel.findByIdAndDelete(id);
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким email не найден');
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль');
    }
    // FIXME: delete unnecessary users
    // clear user for long time not loginned and not activatelink
    // if (!user.isActivated && user.activationLinkExpiration < new Date()) {
    //   await this.deleteUserAfterExpiration(user['_id']);
    //   throw ApiError.BadRequest('Пользователь с таким email не найден');
    // }
    const userDto = new ShortUser(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw AuthError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw AuthError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new ShortUser(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getUser(id) {
    const user = await UserModel.findById(id);
    const userDto = new User(user);

    return { ...userDto };
  }

  async editUser({
    firstName,
    about,
    lastName,
    secondName,
    photoPath,
    city,
    phone,
    userId,
  }) {
    let isFullRegister = false;
    if (firstName && secondName && Object.keys(city).length === 2 && phone) {
      isFullRegister = true;
    }
    return await UserModel.findByIdAndUpdate(userId, {
      firstName,
      about,
      lastName,
      secondName,
      photoPath,
      phone,
      city,
      isFullRegister,
    });
  }

  async getPersonalPage(userId) {
    const user = await UserModel.findById(userId, {
      _id: 1,
      email: 1,
      type: 1,
      phone: 1,
      firstName: 1,
      lastName: 1,
      secondName: 1,
      about: 1,
      photoPath: 1,
      city: 1,
      isFullRegister: 1,
      isActivated: 1,
    });
    if (user.type === userType.CREATOR) {
      const spheres = await caseService.getSpheresForUser(userId);
      const casesCount = await caseService.getCountCasesForUser(userId);
      const sumPrice = await caseService.getAveragePriceForUser(userId);
      const cases = await caseService.searchCases({ userId });
      const userDto = new User(user);

      return {
        user: userDto,
        sumPrice,
        spheres,
        cases,
        casesCount,
      };
    }

    // TODO: customer active cases and completed
    return {
      user,
      activeCases: [],
      completedCases: [],
    };
  }

  async getFavorites(userId) {
    const data = await UserModel.aggregate(searchCases.favoritesQuery(userId));
    console.dir(data, { depth: null });

    return data;
  }

  // TODO: only uniq stay in favorite array
  async setFavorites(userId, favoriteId, action) {
    if (action) {
      await UserModel.updateOne(
        { _id: userId },
        { $push: { favorites: favoriteId } }
      );
    } else {
      await UserModel.updateOne(
        { _id: userId },
        { $pull: { favorites: { $in: [favoriteId] } } }
      );
    }
  }

  async getUserCases(userId) {
    const cases = await CaseModel.find({ userId });
    console.log('getUserCases');
    console.log(cases);
  }
}

module.exports = new UserService();
