const _ = require('lodash');

const { User } = require('../models/user.model');
const { AuthService } = require('../services');

const whitelist = {
  '/auth/signup-confirm': true,
  '/auth/signup-request': true
};

module.exports = async (req, res, next) => {
  if (whitelist[req.path] === true) {
    return next()
  }

  try {
    const token = req.headers['authorization']
    if (token === null) {
      throw 'api.auth.token.none' // 'No token provided'
    }
    if (!token.startsWith('Bearer ')) {
      throw 'api.auth.token.type.invalid' // 'Invalid token type'
    }
    const payload = AuthService.verifyToken(token.substring(7))
    if (payload == null) {
      throw 'api.auth.token.invalid' // 'Invalid token'
    }
    const user = await User.findOneById(payload._id)
    if (user == null) {
      throw 'api.auth.token.user.none' // 'Invalid token: user not found'
    }
    req.user = _.pick(user, [
      '_id',
      'phone',
      'user_id',
      'name',
      'avatar',
      'points'
    ]);
    next()
  } catch (err) {
    res.status(400).send({
      result: 'error',
      message: err.message
    })
  }
};
