'use strict'

/*
 This model is one related with Trust Networks.
*/

import mongoose from 'mongoose';
import BaseModel from './_base.model';
import { VULNERABILITIES } from './reflection.model';

const  { Schema } = mongoose;

class NetworkModel extends BaseModel {

  constructor() {

    const schema = {
      owner: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      title: {
        type: String,
        required: true,
        trim: true,
      },
      members: {
        type: Array,
        required: true
      },
      permissions: {
        type: Array,
        required: true
      },
      tags: {
        type: Array,
        required: true
      },
      vulnerability: {
        type: Number,
        enum: VULNERABILITIES.values(),
        required: true
      }
    };

    super( 'Network', schema );
  }
}

const networkModel = new NetworkModel();

Object.keys(VULNERABILITIES).map((key) => {
  Object.defineProperty(networkModel, key, {
    value: VULNERABILITIES[key],
    writable: false,
    enumerable: true,
    configurable: true
  });
});

module.exports = {
  Network: networkModel
};