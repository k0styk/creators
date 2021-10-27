const UserModel = require('../../models/user');
const CaseModel = require('../../models/cases');
const { userType } = require('../../models/helper');
const { User } = require('../../dtos/user');
const caseService = require('../case/case');
const { searchCases } = require('../aggregations');

class UserService {
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
  }
}

module.exports = new UserService();
