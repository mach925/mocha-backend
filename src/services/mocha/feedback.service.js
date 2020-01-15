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
 * @@ request_id (String : Required) - Reflection DB id
 * @@ requester (String : Required) - User DB id
 * @@ sender (String : Required) - User DB id
 * @@ feedback (String : Required)
 *
 * @ return created Feedback Object
 *
 */
const createFeedback = async ({...params}) => {
	const {
		request_id,
		requester,
		sender,
		feedback
	} = params;

	try {
		let requestDbId = Feedback.convertToDbId(request_id);

		if (!requestDbId)
			throw new Error(Errors.REFLECTION_NOT_FOUND);

		let requesterDbId = Feedback.convertToDbId(requester);

		if (!requesterDbId)
			throw new Error(Errors.PROFILE_NOT_FOUND);

		let senderDbId = Feedback.convertToDbId(sender);

		if (!senderDbId)
			throw new Error(Errors.PROFILE_NOT_FOUND);

		const feedback_doc = await Feedback.create({
			request_id,
			requesterDbId,
			senderDbId,
			feedback
		});

		// To do : Cache Feedback info

		return feedback_doc;
	} catch (err) {
		throw err;
	}
};

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
 * find Feedback by Refelction db id,
 *
 * @ Required params
 * @@ id (String : Required)
 *
 * @ return Feedback Object / null
 *
 */
const findfeedbackByRequestId = async (id) => {
	try {
		let feedback;

		feedback = await Feedback.findOne({
			request_id: id
		});

		return feedback;
	} catch(err) {
		throw err;
	}
};

/*
 * find Feedbacks by requester id,
 *
 * @ Required params
 * @@ id (String : Required)
 *
 * @ return List of Feedback Object / null
 *
 */
const findfeedbackByRequester = async (id) => {
	try {
		let feedbacks;

		feedbacks = await Feedback.find({
			requester: id
		});

		return feedbacks;
	} catch(err) {
		throw err;
	}
};

/*
 * find Feedbacks by sender id,
 *
 * @ Required params
 * @@ id (String : Required)
 *
 * @ return List of Feedback Object / null
 *
 */
const findfeedbackBySender = async (id) => {
	try {
		let feedbacks;

		feedbacks = await Feedback.find({
			sender: id
		});

		return feedbacks;
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
		let feedbacks = await Feedback.find({
			$or: [{sender: id}, {receiver: id}]
		});

		return feedbacks;
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

		dbFeedback.feedback = feedback || dbFeedback.feedback;

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
const deleteFeedbacksByGroupId = async (groupId) => {
	try {
		await Feedback.deleteManyByQuery({ groupId });

		return true;
	} catch(err) {
		throw err;
	}
};

module.exports = {
	createFeedback,
	createFeedbacks,
	updateFeedback,
	findfeedbackBySender,
	findfeedbackByRequester,
	findfeedbackByRequestId,
	findfeedbackById,
	findFeedbacks,
	deleteFeedback,
	deleteFeedbacksByGroupId
};
