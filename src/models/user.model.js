'use strict'

/*
 This model is one for user's profile
*/

import mongoose from 'mongoose';
import BaseModel from './_base.model';

const  { Schema } = mongoose;

class UserModel extends BaseModel {

  constructor() {

    const schema = {
      phone: {
        type: String,
        required: true,
        trim: true,
        unique: true
      },
      user_id: {
        type: String,
        required: false,
        trim: true
      },
      name: {
        type: String,
        required: false,
        trim: true
      },
      avatar: {
        type: String,
        trim: true
      },
      points: {
        type: Number
      },
      pushToken: {
        type: String,
        trim: true
      }
    };

    super( 'User', schema );

  }
}

const userModel = new UserModel();
module.exports = {
  User: userModel
};