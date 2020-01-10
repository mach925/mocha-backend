'use strict'

/*
 This model is one related with Reflection Feed.
*/

import mongoose from 'mongoose';
import BaseModel from './_base.model';

const  { Schema } = mongoose;

const models = {
  MODEL_MANUAL: "Manual",
  MODEL_VALUE: "Value",
  MODEL_FEEDBACK: "Feedback",
  MODEL_GOAL: "Goal",
  MODEL_MOOD: "Mood",
  MODEL_NEED: "Need",
  MODEL_TAP: "Tap"
};

const VULNERABILITIES = {
  NOT_VULNERABLE: 1,
  SOMEWHAT_VULNERABLE: 2,
  VERY_VULNERABLE: 3,
  MOST_VULNERABLE: 4
};

class ReflectionModel extends BaseModel {

  constructor() {

    const schema = {
      owner: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      type: {
        type: String,
        enum: Object.values(models),
        required: true,
      },
      data: {
        type: Object,
        trim: true,
      }
    };

    super( 'Reflection', schema );
  }
}

const reflectionModel = new ReflectionModel();

Object.keys(models).map((key) => {
  Object.defineProperty(reflectionModel, key, {
    value: models[key],
    writable: false,
    enumerable: true,
    configurable: true
  });
});

Object.keys(VULNERABILITIES).map((key) => {
  Object.defineProperty(reflectionModel, key, {
    value: VULNERABILITIES[key],
    writable: false,
    enumerable: true,
    configurable: true
  });
});

module.exports = {
  Reflection: reflectionModel,
  VULNERABILITIES
};
