const uuid = require('uuid');
const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcrypt');
const UserModel = require('../../models/user');
const CaseModel = require('../../models/cases');
const { SeedSphere } = require('../../models/names');
const mailService = require('../mail/mail');
const { ShortUser, User } = require('../../dtos/user');
const { SphereAggregateDto } = require('../../dtos/seed');
const ApiError = require('../../exceptions/api-error');
const user = require('../../models/user');
const { userType } = require('../../models/helper');
const tokenService = require('../token');
const caseService = require('../case/case');

const knex = require('../../knex/index');
const {
  getUser,
  getUserCountCases,
  getUserCases,
  getUserSphereTypes,
  getUserSumPrice,
} = require('./tools/queries');

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
    // await mailService.sendActivationMail(
    //     email,
    //     `${process.env.API_URL}/auth/activate/${activationLink}`
    // );

    const userDto = new ShortUser(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    console.log(user);
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
    await UserModel.findByIdAndDelete(id);
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
    if (!user.isActivated && user.activationLinkExpiration < new Date()) {
      await this.deleteUserAfterExpiration(user['_id']);
      throw ApiError.BadRequest('Пользователь с таким email не найден');
    }
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
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
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
    if (
      firstName &&
      about &&
      lastName &&
      secondName &&
      photoPath &&
      city &&
      phone
    ) {
      isFullRegister = ture;
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
    });
    if (user.type === userType.CREATOR) {
      // TODO: END GetPersonalPage
      const spheresAggregate = await CaseModel.aggregate([
        { $match: { userId: new ObjectId(userId) } },
        {
          $lookup: {
            from: 'seed.spheres',
            localField: 'sphereId',
            foreignField: '_id',
            as: 'spheres',
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ['$spheres', 0] }, '$$ROOT'],
            },
          },
        },
        { $project: { name: 1 } },
        { $group: { _id: '$name' } },
      ]);
      const spheres = spheresAggregate.map(
        (v) => new SphereAggregateDto(v).sphere
      );
      const casesCount = await CaseModel.find({
        userId: new ObjectId(userId),
      }).count();
      const prices = await CaseModel.aggregate([
        { $match: { userId: new ObjectId(userId) } },
        {
          $project: {
            userId: 1,
            services: {
              $filter: {
                input: '$services',
                as: 'item',
                cond: { $eq: ['$$item.serviceType', 1] },
              },
            },
          },
        },
        {
          $project: {
            userId: 1,
            Prices: { $sum: '$services.price' },
          },
        },
        {
          $group: {
            _id: '$userId',
            sumPrices: { $sum: '$Prices' },
          },
        },
      ]);
      console.log(userId);
      const cases = await caseService.searchCases({ userId });

      return {
        user,
        sumPrice: prices[0]['sumPrices'], // TODO: check prices if exists
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

    return new User(user);
  }

  // TODO: getFavorites
  async getFavorites(userId) {
    const favorites = await UserModel.find(userId, 'favorites').populate(
      'Cases',
      'id title youtubeId'
    );
    console.log(favorites);
    return favorites;
  }

  async setFavorites(userId, favoriteId, action) {
    console.log(action);
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
    console.log(cases);
  }
}

module.exports = new UserService();
