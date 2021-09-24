const uuid = require('uuid');
const bcrypt = require('bcrypt');
const UserModel = require('../../models/user');
const mailService = require('../mail/mail');
const tokenService = require('../token');
const { ShortUser, User } = require('../../dtos/user');
const ApiError = require('../../exceptions/api-error');
const user = require('../../models/user');
const { userType } = require('../../models/helper');

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
            roleTypeId,
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
        console.log(tokens);

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
            const [spheres, cases, casesCount, sumPrice] = await Promise.all([
                searchCases({ body: { userId }, knex }),
                getUserSphereTypes(knex, userId),
                getUserCountCases(knex, userId),
                getUserSumPrice(knex, userId),
            ]);

            return {
                ...sumPrice,
                usr,
                spheres,
                cases,
                casesCount: (casesCount && casesCount.count) || 0,
            };
        }

        return {
            usr,
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

    async setFavorites(userId, favoriteId) {
        await UserModel.updateOne(
            { _id: userId },
            { $push: { favorites: favoriteId } }
        );
    }
}

module.exports = new UserService();
