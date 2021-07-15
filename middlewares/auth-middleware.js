const ApiError = require('../exeptions/api-error');
const tokenService = require('../service/token-service');

module.exports = function (req, res, next) {
    try {

        let accessToken = req.headers.authorization;

        if (!accessToken) {
            console.log('NO ACCESS TOKEN')
            return next(ApiError.UnauthorizedError());
        }
        console.log('ACCESS TOKEN', accessToken)
        const userData = tokenService.validateAccessToken(accessToken);

        if (!userData) {
            console.log('NO USER DATA')
            return next(ApiError.UnauthorizedError());
        }

        console.log('userData', userData)

        req.user = userData;
        next();
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};
