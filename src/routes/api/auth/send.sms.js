const {
  accountSid,
  authToken,
  senderNumber
} = require('../../../config/twilio.config')
const { Sms } = require('../../../models/sms.model')

module.exports = async (req, res) => {

  const { phone_number } = req.body

  try {
    // Validate parameters existence
    if (!phone_number) {
      res.status(400).send({
        result: 'error',
        message: 'Please provide phone number'
      })
      return next()
    }

    // Create random verification code - 6 digits
    const digits = Math.floor(100000 + Math.random() * 900000)

    // Send sms message
    const client = require('twilio')(accountSid, authToken)
    const message = await client.messages.create({
      body: `Mocha verification code: ${digits}`,
      from: senderNumber,
      to: phone_number
    })
    if (!message) {
      res.status(400).send({
        result: 'error',
        message: 'Failed to send sms, please try again.'
      })
    }

    // Save sms object for validation
    let oldSms = await Sms.findOne({ phone_number })
    if (oldSms) {
      oldSms.code = digits
      oldSms.expireAt = Date.now()
      await oldSms.save()
    } else {
      await Sms.create({
        phone_number,
        code: digits
      })
    }

    res.status(200).send({
      result: 'ok',
      data: {
        message: `Verification code sent to ${phone_number} successfully expires in 5 minutes`,
        expireTime: 5
      }
    })
  } catch(err) {
    res.status(400).send({
      result: 'error',
      message: err.message
    })
  }
}
