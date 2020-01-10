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
      }, 404);
      return next();
    } else {
      await sms.remove();
    }

    // TODO: Create user account
    const user = await ProfileService.createProfile({
      phone,
    });

    res.success({
      user,
      token: AuthService.generateToken(user),
      message: 'api.auth.sms-request.success' //'verification success'
    });
  } catch(err) {
    res.error({
      message: err.message
    });
  }
};
