const _ = require('lodash')

const { verifyToken } = require('../services/auth')

const whitelist = {
  '/auth/send-sms': true,
  '/auth/validate-sms': true
}

module.exports = async (req, res, next) => {
  if (whitelist[req.path] === true) {
    return next()
  }

  try {
    const token = req.headers['authorization']
    if (token === null) {
      throw 'No token provided'
    }
    if (!token.startsWith('Bearer ')) {
      throw 'Invalid token type'
    }
    const payload = verifyToken(token.substring(7))
    if (payload == null) {
      throw 'Invalid token'
    }
    const user = await User.findByPk(payload.id)
    if (user == null) {
      throw 'Invalid token: user not found'
    }
    req.user = _.pick(user, [
      '_id',
      'phone_number'
    ])
    next()
  } catch (err) {
    res.status(400).send({
      result: 'error',
      message: err.message
    })
  }
}
