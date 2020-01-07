const { User } = require('../../../models/user.model');
const { Sms } = require('../../../models/sms.model');
const { generateToken } = require('../../../services/auth');

module.exports = async (req, res) => {

  const { phone_number, code } = req.body;

  try {
    // Validate parameters existence
    if (!phone_number || !code) {
      res.error({
        message: 'api.auth.code.none' //'Please provide code'
      });
      return next();
    }

    // Compare user input code and sms saved to db
    const sms = await Sms.findOne({ phone_number, code });
    if (!sms) {
      res.error({
        message: 'api.auth.code.expired' //'Code expired'
      }, 404);
      return next();
    } else {
      await sms.remove();
    }

    // TODO: Create user account
    const user = await User.create({
      phone: phone_number,
    });

    res.success({
      user,
      token: generateToken(),
      message: 'api.auth.validation.success' //'verification success'
    });
  } catch(err) {
    res.error({
      message: err.message
    });
  }
};
