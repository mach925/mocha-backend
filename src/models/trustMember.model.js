'use strict'

/*
 This model is one for trust members of Trust Networks.
*/

import mongoose from 'mongoose';
import BaseModel from './_base.model';

const  { Schema } = mongoose;

const states = {
  STATE_PENDING: 0,
  STATE_APPROVED: 1,
};

class TrustMemberModel extends BaseModel {

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
        enum: Object.values(states)
      }
    };

    super( 'TrustMember', schema );
  }
}

const trustMemberModel = new TrustMemberModel();

Object.keys(states).map((stateKey) => {
  Object.defineProperty(trustMemberModel, stateKey, {
    value: states[stateKey],
    writable: false,
    enumerable: true,
    configurable: true
  });
});

module.exports = {
  TrustMember: trustMemberModel,
  STATES: states
};