const { Sms } = require('../../../models/sms.model');
const {
  AuthService,
  ProfileService
} = require('../../../services');

module.exports = async (req, res) => {

  const { phone, code } = req.body;

  try {
    // Validate parameters existence
    if (!phone || !code) {
      res.error({
        message: 'api.auth.sms-validate.no-code' //'Please provide code'
      });
      return next();
    }

    // Compare user input code and sms saved to db
    const sms = await Sms.findOne({ phone, code });
    if (!sms) {
      res.error({
        message: 'api.auth.sms-validate.code-expired' //'Code expired'
      });
      return next();
    } else {
      await sms.remove();
    }

    // Get existing user, if not, create new one.
    let user = await ProfileService.findProfileByPhone(phone);
    if (!user) {
      user = await ProfileService.createProfile({
        phone,
      });
    }

    res.success({
      user,
      token: AuthService.generateToken(user),
      message: 'api.auth.sms-confirm.success' //'verification success'
    });
  } catch(err) {
    res.error({
      message: err.message
    });
  }
};
