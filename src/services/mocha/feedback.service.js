/*
 This file provides apis related with Feedback.
*/
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
		let feedback = await Feedback.findOneById(_id || id);

		if(!feedback)
				throw new Error(Errors.FEEDBACK_NOT_FOUND);

		feedback.feedback = feedback || feedback.feedback;

		await feedback.save();

		// To do : Update cache

		return feedback;
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

module.exports = {
	createFeedback,
	updateFeedback,
	findfeedbackBySender,
	findfeedbackByRequester,
	findfeedbackByRequestId,
	findfeedbackById,
	deleteFeedback
};