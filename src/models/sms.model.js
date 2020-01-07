/*
 This model is one for SMS verification
*/
import BaseModel from './_base.model';

class SmsModel extends BaseModel {

  constructor() {

    const schema = {
      phone_number: {
        type: String,
        required: true,
        trim: true,
        unique: true
      },
      code: {
        type: String,
        required: false,
        trim: true
      },
      expireAt: {
        type: Date,
        default: Date.now,
        index: {
          expires: '5m'
        }
      }
    };

    super( 'Sms', schema );

  }
}

const smsModel = new SmsModel();
module.exports = {
  Sms: smsModel
};
