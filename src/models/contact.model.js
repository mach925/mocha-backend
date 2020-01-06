'use strict'

/*
 This model is one for contacts of Trust Networks.
*/

import mongoose from 'mongoose';
import BaseModel from './_base.model';

const  { Schema } = mongoose;

const states = {
  STATE_PENDING: 0,
  STATE_APPROVED: 1,
};

class ContactModel extends BaseModel {

  constructor() {

    const schema = {
      owner: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      joiner: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      status: {
        type: Number,
        enum: states.values()
      }
    };

    super( 'Contact', schema );
  }
}

const contactModel = new ContactModel();

Object.keys(states).map((stateKey) => {
  Object.defineProperty(contactModel, stateKey, {
    value: states[stateKey],
    writable: false,
    enumerable: true,
    configurable: true
  });
});

module.exports = {
  Contact: contactModel
};