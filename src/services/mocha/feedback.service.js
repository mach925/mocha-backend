/*
 This file provides apis related with Feedback.
*/
const _ = require('lodash');
import { Reflection } from '../../models/reflection.model';
import { Feedback } from '../../models/feedback.model';
import Errors from '../../constants/error.constant';

/*
 * Create new Feedback
 *
 * @ Required params
 * @@ receivers (Array : Required) - Array of Receivers
 * @@ sender (User : Required) - Me
 * @@ questions (Array : Required) - Array of questions
 *
 * @ return created Feedbacks Object
 *
 */
const createFeedbacks = async ({...params}) => {
	const {
		receivers,
		sender,
		questions
	} = params;

	try {
		let senderDbId = Reflection.convertToDbId(sender._id);
		if (!senderDbId)
			throw new Error(Errors.PROFILE_NOT_FOUND);

		const reflection = await Reflection.create({
			owner: senderDbId,
			type: "Feedback"
		});
		let reflectionDbId = Reflection.convertToDbId(reflection._id);

		let feedbacks = [];
		let now = _.now();

		_.forEach(receivers, function(receiver) {
			let receiverDbId = Feedback.convertToDbId(receiver._id);
			if (!receiverDbId)
				throw new Error(Errors.PROFILE_NOT_FOUND);

			_.forEach(questions, function(question) {
				feedbacks.push({
					sender: senderDbId,
					receiver: receiverDbId,
					pending: true,
					question,
					feedback: '',
					groupId: reflectionDbId,
					created: now,
					updated: now
				});
			})
		});

		await Feedback.insertMany(feedbacks);

		return true;
	} catch (err) {
		throw err;
	}
};

/*
 * find Feedback by id/_id,
 *
 * @ Required params
 * @@ id/_id (String : Required)
 *
 * @ return Feedback Object / null
 *
 */
const findfeedbackById = async (id) => {
	try {
		let feedback;
		// To do : find from cache

		if (!feedback) {
			feedback = await Feedback.findOneById(id);
		}

		return feedback;
	} catch(err) {
		throw err;
	}
};

/*
 * Get all feedbacks related with user
 *
 * @ Required params
 * @@ id (String : Required) - User DB id
 *
 * @ return Feedback Array
 *
 */
const findFeedbacks = async (id) => {
	try {
		let feedbacks = await Feedback.aggregate([
			{
				$match:	{
					$or: [{sender: id}, {receiver: id}]
				}
			},
			{
				$lookup: {
				from: 'users',
				localField: 'sender',
				foreignField: '_id',
				as: 'senderInfo'
				}
			},
			{
				$lookup: {
				from: 'users',
				localField: 'receiver',
				foreignField: '_id',
				as: 'receiverInfo'
				}
			},
			{
				$unwind: {
					path: '$senderInfo',
					preserveNullAndEmptyArrays: true
				}
			},
			{
				$unwind: {
					path: '$receiverInfo',
					preserveNullAndEmptyArrays: true
				}
			},
			{
				$project: {
					pending: '$pending',
					_id: '$_id',
					sender: {
						_id: '$senderInfo._id',
						name: '$senderInfo.name',
						avatar: '$senderInfo.avatar'
					},
					receiver: {
						_id: '$receiverInfo._id',
						name: '$receiverInfo.name',
						avatar: '$receiverInfo.profile.avatar'
					},
					question: '$question',
					feedback: '$feedback',
					groupId: '$groupId',
					created: '$created',
					updated: '$updated'
				}
			}
		]);

		let latestDate = new Date(Math.max.apply(null, feedbacks.map(function(e) {
			return new Date(e.updated)
		})));
		
		return {feedbacks: feedbacks, updated: latestDate};
	} catch(err) {
		throw err;
	}
};

/*
 * Update new Feedback by id/_id,
 *
 * @ Required params
 * @@ request_id (String : Required) - Reflection DB id
 * @@ requester (String : Required) - User DB id
 * @@ sender (String : Required) - User DB id
 * @@ feedback (String : Required)
 *
 * @ return Feedback Object
 *
 */
const updateFeedback = async ({...params}) => {
	const {
		_id,
		id,
		feedback
	} = params;

	try {
		let dbFeedback = await Feedback.findOneById(_id || id);

		if(!dbFeedback)
				throw new Error(Errors.FEEDBACK_NOT_FOUND);

		dbFeedback.pending = feedback.pending || dbFeedback.pending;
		dbFeedback.question = feedback.question || dbFeedback.question;
		dbFeedback.feedback = feedback.feedback || dbFeedback.feedback;

		await dbFeedback.save();

		// To do : Update cache

		return dbFeedback;
	} catch(err) {
		throw err;
	}

	return id || _id;
};

/*
 * Delete Feedback by id/_id,
 *
 * @ Required params
 * @@ id/_id (String : Required)
 *
 * @ return Feedback Object
 *
 */
const deleteFeedback = async ({...params}) => {
	const {
		_id,
		id
	} = params;

	try {
		// To do : // delete feedback from cache

		let feedback = await Feedback.findOneById(_id || id);

		if(!feedback)
				throw new Error(Errors.FEEDBACK_NOT_FOUND);
		await feedback.remove();

		return feedback;
	} catch(err) {
		throw err;
	}
};

/*
 * Delete Feedbacks by groupId
 *
 * @ Required params
 * @@ id/_id (String : Required)
 *
 * @ return Feedback Object
 *
 */
const deleteFeedbacksByGroupId = async (params) => {
	const {
		receiver,
		groupId
	} = params;

	try {
		let query = { groupId };
		if (receiver) {
			const receiverDbId = Feedback.convertToDbId(receiver);
			query.receiver = receiverDbId;
		}

		await Feedback.deleteManyByQuery(query);

		// delete related reflection
		let reflection = await Reflection.findOne({
			_id: groupId
		});

		if (!reflection)
			throw new Error(Errors.REFLECTION_NOT_FOUND);

		await Reflection.deleteOne({
			_id: reflection._id
		});
	} catch(err) {
		throw err;
	}
};

module.exports = {
	createFeedbacks,
	updateFeedback,
	findfeedbackById,
	findFeedbacks,
	deleteFeedback,
	deleteFeedbacksByGroupId
};
