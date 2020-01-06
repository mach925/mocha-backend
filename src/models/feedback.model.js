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
      request_id: {
        type: Schema.Types.ObjectId,
        ref: 'Reflection',
        requried: true
      },
      requester: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        requried: true
      },
      sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        requried: true
      },
      feedback: {
        type: String,
        required: true,
        trim: true
      }
    };

    super( 'Feedback', schema );

  }
}

const feedbackModel = new FeedbackModel();
module.exports = {
  Feedback: feedbackModel
};