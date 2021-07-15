const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const dayjs = require('dayjs');
const ApiError = require('../exeptions/api-error');

class UserService {
    async login(email) {

        try {
            const candidate = await UserModel.findOne({email})
            if (!candidate) {
                throw new Error(`Пользователь с почтовым адресом ${email} уже существует`)
            }

            const verificationCode =  Math.floor(100000 + Math.random() * 900000);
            candidate.verificationCode = verificationCode;
            candidate.codeCreatedAt = new Date().getTime();
            console.log('verificationCode', verificationCode)
            await candidate.save();

            await mailService.sendActivationMail(email, verificationCode)


            // const userDto = new UserDto(user);
            // const tokens = tokenService.generateTokens({...userDto})
            // await tokenService.saveToken(userDto.id, tokens.refreshToken)

            return { success: true,  status: 'verification' };
        } catch (e) {
            return { success: false, message: e };
        }
    }

    async verification(data) {
        try {
            const { email, code } = data;

            const candidate = await UserModel.findOne({email});

            if (!candidate || candidate.verificationCode !== code) {
                throw new Error(`Не верные данные верификации`);
            }

            const isCodeValid = dayjs().subtract(15, 'minutes').isBefore(dayjs(candidate.codeCreatedAt), 'minutes');

            if (!isCodeValid) {
                throw new Error(`Code expired`);
            }

            candidate.isActivated = true;

            await candidate.save();

            const userDto = new UserDto(candidate);
            const tokens = tokenService.generateTokens({...userDto});
            await tokenService.saveToken(userDto.id, tokens.refreshToken);

            return { status: 'success', data: candidate, ...tokens };
        } catch (e) {

            return { status: 'error', message: e };
        }
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
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }


    async getAllUsers() {
        const users = await UserModel.find();
        return users;
    }

    async checkUser(email) {

        const candidate = await UserModel.findOne({email});

        return candidate;
    }
}

module.exports = new UserService();
