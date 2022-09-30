const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../helpers/errors/UnauthorizedError');
const { authorizationErrorMessage } = require('../helpers/constants');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(authorizationErrorMessage));
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
    } catch (err) {
      next(new UnauthorizedError(authorizationErrorMessage));
    }
    req.user = payload;
    next();
  }
};
