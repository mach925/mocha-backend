const _ = require('lodash');

const {
  AuthService,
  ProfileService
} = require('../services');

const whitelist = {
  '/auth/signup-confirm': true,
  '/auth/signup-request': true
};

module.exports = async (req, res, next) => {
  if (whitelist[req.path] === true) {
    return next();
  }

  try {
    const token = req.headers['authorization'];
    if (token === null) {
      // No token provided
      throw 'api.auth.token.none';
    }
    if (!token.startsWith('Bearer ')) {
      // Invalid token type
      throw 'api.auth.token.type.invalid';
    }
    const payload = AuthService.verifyToken(token.substring(7));
    if (payload == null) {
      // Invalid token
      throw 'api.auth.token.invalid';
    }

    console.log("payload", payload);
    const user = await ProfileService.findProfileById(payload._id);
    if (user == null) {
      // Invalid token: user not found
      throw 'api.auth.token.user.none';
    }
    req.user = _.pick(user, [
      '_id',
      'phone',
      'user_id',
      'name',
      'avatar',
      'points'
    ]);
    next();
  } catch (err) {
    res.status(400).send({
      result: 'error',
      message: err.message
    });
  }
};
