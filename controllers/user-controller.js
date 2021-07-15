const userService = require('../service/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exeptions/api-error');


class UserController {

    async login(req, res, next) {
        try {
            const { email } = req.body;

            console.log(email);

            const loginResponse = await userService.login(email);

            // res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.json(loginResponse);
        } catch (e) {
            next(e);
        }
    }

    async verification(req, res, next) {
        try {
            // const email = req.params.email;
            // const code = req.params.code;
            const verificationResponse = await userService.verification(req.body);

            return res.json(verificationResponse);
            // return res.redirect(process.env.CLIENT_URL);
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



    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            // console.log('refreshToken', refreshToken)
            const userData = await userService.refresh(refreshToken);
            // console.log('USER DATA', userData)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers();
            res.send(users);
        } catch (e) {
            next(e);
        }
    }

    async checkUser(req, res, next) {
        try {

            const email = req.query.email;

            const user = await userService.checkUser(email);
            // console.log('USER', user)
            if (user) {
                res.send({status: 'Authorized'});
                // res.status(200)
            } else {
                // res.status(200)
                res.send({status: 'isNotAuth'});
            }
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new UserController();
