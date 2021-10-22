const ApiError = require('../exceptions/api-error');
const AuthError = require('../exceptions/auth-error');

module.exports = function (err, req, res, next) {
  if (process.env['NODE_ENV'] === 'dev') {
    console.log(err);
    if (err instanceof ApiError) {
      return res
        .status(err.status)
        .json({ message: err.message, errors: err.errors });
    }
    if (err instanceof AuthError) {
      return res
        .status(err.status)
        .json({ message: err.message, errors: err.errors });
    }
    return res.status(500).json({ message: 'Непредвиденная ошибка' });
  } else {
    return res.status(500).json({ message: 'Непредвиденная ошибка' });
  }
};
