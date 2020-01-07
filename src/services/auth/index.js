const jwt = require('jsonwebtoken')
const _ = require('lodash')

const JWT_MASTER_KEY = '3i238ad6v8ew9gadkgi3250192u37298'

function generateToken(user) {
  const content = _.pick(user, ['id', 'phone_number'])
  return jwt.sign(content, JWT_MASTER_KEY)
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_MASTER_KEY)
  } catch (err) {
    return null
  }
}

module.exports = {
  generateToken,
  verifyToken
}
