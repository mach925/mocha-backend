/*
 This model is one for SMS verification
*/
import BaseModel from './_base.model';
import { sms_expire_time } from '../constants';

class SmsModel extends BaseModel {

  constructor() {

    const schema = {
      phone: {
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
          expires: `${sms_expire_time}m`
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
