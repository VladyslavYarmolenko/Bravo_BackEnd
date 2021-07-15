const userService = require('../service/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exeptions/api-error');


class CatalogController {

    async test(req, res, next) {
        try {
            console.log('TEST AUTH')
            // const { email } = req.body;
            //
            // console.log(email);
            //
            // const loginResponse = await userService.login(email);
            //
            // // res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

            return res.status(200);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new CatalogController();
