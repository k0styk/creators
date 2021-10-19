const AuthError = require('../exceptions/auth-error');
const tokenService = require('../service/token');

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(AuthError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(AuthError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(
      String(accessToken).trim()
    );
    if (!userData) {
      return next(AuthError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(AuthError.UnauthorizedError());
  }
};
