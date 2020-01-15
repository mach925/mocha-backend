'use strict'

/*
 This model is one for feedback
*/

import mongoose from 'mongoose';
import BaseModel from './_base.model';

const  { Schema } = mongoose;

class FeedbackModel extends BaseModel {

  constructor() {

    const schema = {
      sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      pending: {
        type: Boolean,
        required: true,
        default: true
      },
      question: {
        type: String,
        required: true,
        trim: true
      },
      feedback: {
        type: String,
        required: true,
        trim: true
      },
      groupId: {
        type: Schema.Types.ObjectId,
        ref: 'Reflection',
        required: true
      }
    };

    super( 'Feedback', schema );

  }
}

const feedbackModel = new FeedbackModel();
module.exports = {
  Feedback: feedbackModel
};
