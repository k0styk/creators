const uuid = require('uuid');
const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const mailService = require('./mail/mail');
const { ShortUser } = require('../dtos/user');
const ApiError = require('../exceptions/api-error');
const AuthError = require('../exceptions/auth-error');
const tokenService = require('./token');

class AuthService {
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
        `${process.env.API_URL}/auth/activate/${activationLink}`
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
}

module.exports = new AuthService();
