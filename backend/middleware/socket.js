const tokenService = require('../service/token');
const ApiError = require('../exceptions/api-error');

module.exports = (socket, next) => {
  try {
    console.log('MIDDLE WARE');
    console.dir(socket, { depth: null });
    if (socket.handshake.query && socket.handshake.query.token) {
      const tokenData = tokenService.validateAccessToken(
        socket.handshake.query.token
      );
      if (!tokenData) {
      }

      socket.tokenData = tokenData;
      next();
    } else {
      next(new Error('Authentication error'));
    }
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
