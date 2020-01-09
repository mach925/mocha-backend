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
      title: {
        type: String,
        trim: true,
      },
      asset: {
        type: String,
        trim: true,
      },
      text: {
        type: String,
        trim: true
      },
      phrase: {
        type: String,
        trim: true
      },
      action: {
        type: String,
        trim: true
      },
      learned: {
        type: String,
        trim: true
      },
      members: {
        type: Array
      },
      questions: {
        type: Array
      },
      answers: {
        type: Array
      },
      bywhen: {
        type: Date
      },
      measures: {
        type: Array
      },
      story: {
        type: String,
        trim: true
      },
      feelings: {
        type: Array
      },
      needs: {
        type: Array
      },
      today_count: {
        type: Number
      },
      week_count: {
        type: Number
      },
      tags: {
        type: Array
      },
      vulnerability: {
        type: Number,
        enum: VULNERABILITIES.values()
      },
      type: {
        type: String,
        enum: models.values(),
        required: true,
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