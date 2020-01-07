const jwt = require('jsonwebtoken');
const _ = require('lodash');

function generateToken(user) {
  const content = _.pick(user, ['id', 'phone_number']);
  return jwt.sign(content, process.env.JWT_MASTER_KEY);
}

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_MASTER_KEY);
  } catch (err) {
    return null;
  }
}

module.exports = {
  generateToken,
  verifyToken
};
