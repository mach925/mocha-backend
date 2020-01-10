const { Sms } = require('../../../models/sms.model');
const { sms_expire_time } = require('../../../constants');

module.exports = async (req, res) => {

  const { phone } = req.body;

  try {
    // Validate parameters existence
    if (!phone) {
      res.error({
        message: 'api.auth.sms-request.no-phone' //'Please provide phone number'
      });
      return next();
    }

    // Create random verification code - 6 digits
    const digits = Math.floor(100000 + Math.random() * 900000);
    
    // Send sms message
    const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    const message = await client.messages.create({
      body: `Mocha verification code: ${digits}`,
      from: process.env.TWILIO_SENDER_NUMBER,
      to: phone
    });
    if (message.status === 'failed') {
      res.error({
        message: 'api.auth.sms-request.failed' //'Failed to send sms, please try again.'
      });
    }

    // Save sms object for validation
    let oldSms = await Sms.findOne({ phone });
    if (oldSms) {
      oldSms.code = digits;
      oldSms.expireAt = Date.now();
      await oldSms.save();
    } else {
      await Sms.create({
        phone,
        code: digits
      });
    }

    res.success({
      message: 'api.auth.sms-request.success',// `Verification code sent to ${phone} successfully expires in 5 minutes`,
      expireTime: sms_expire_time
    });
  } catch(err) {
    res.error({
      message: err.message
    });
  }
};
