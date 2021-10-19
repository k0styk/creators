module.exports = class AuthError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new AuthError(401, 'Пользователь не авторизован');
  }
};
