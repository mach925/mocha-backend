/*
 This file provides apis related with trust member.
*/
import ProfileService from './profile.service';
import { TrustMember, STATES } from '../../models/trustMember.model';
import Errors from '../../constants/error.constant';

/*
 * Sends request for trust member other user
 *
 * @ Required params
 * @@ from - db id of user requesting trust member  : String
 * @@ to - owner's phone, user_id, db id
 *
 * @ return created TrustMember Object
 *
 */
const requestTrustMember = async ({...params}) => {
	const {
		from,
		to
	} = params;

	try {
		let joinerDbId = TrustMember.convertToDbId(from);
		let ownerDbId = TrustMember.convertToDbId(to);
		
		if (!ownerDbId) {
			const user = await ProfileService.findProfileByPhoneorUserId(to);
			if (user) 
				ownerDbId = user._id;
		}

		if (!ownerDbId || !joinerDbId) 
			throw new Error(Errors.PROFILE_NOT_FOUND);

		const trustMember = await TrustMember.create({
			owner: ownerDbId,
			joiner: joinerDbId,
			status: STATES.STATE_PENDING
		});
		
		return trustMember;
	} catch (err) {
		throw err;
	}
};

/*
 * Accepts request or add new trust member
 *
 * @ Required params
 * @@ owner - db id of user accepting or adding trust member  : String
 * @@ joiner - conacter's phone, user_id, db id
 *
 * @ return created TrustMember Object
 *
 */
const acceptOrAddTrustMember = async ({...params}) => {
	const {
		owner,
		joiner
	} = params;

	try {
		let ownerDbId = TrustMember.convertToDbId(owner);
		let joinerDbId = TrustMember.convertToDbId(joiner);
		
		if (!joinerDbId) {
			const user = await ProfileService.findProfileByPhoneorUserId(joiner);
			if (user) 
				joinerDbId = user._id;
		}

		if (!ownerDbId || !joinerDbId) 
			throw new Error(Errors.PROFILE_NOT_FOUND);

		let trustMember = await TrustMember.findOne({owner: ownerDbId, joiner: joinerDbId});

		if (trustMember) {
			trustMember.status = STATES.STATE_APPROVED;
			await trustMember.save();
		} else {
			trustMember = await TrustMember.create({
				owner: ownerDbId,
				joiner: joinerDbId,
				status: STATES.STATE_APPROVED
			});
		}

		return trustMember;
	} catch (err) {
		throw err;
	}
};

/*
 * returns all trust member of user,
 *
 * @ Required params
 * @@ id/_id (String, Requried) : User's DB id
 *
 * @ return List of TrustMember Object
 *
 */
const findAllUserTrustMembers = async ({...params}) => {
	try {
		const {
			_id,
			id,
		} = params;

		let trustMembers = await TrustMember.find({
			owner: _id || id
		});

		return trustMembers;
	} catch(err) {
		throw err;
	}
};

/*
 * returns all trust member of user by status,
 *
 * @ Required params
 * @@ id/_id (String, Requried) : User's DB id
 * @@ status (Number, Requried)
 *
 * @ return List of TrustMember Object
 *
 */
const findAllUserTrustMembersByStatus = async ({...params}) => {
	try {
		const {
			_id,
			id,
			status
		} = params;

		let trustMembers = await TrustMember.find({
			owner: _id || id,
			status: status
		});

		return trustMembers;
	} catch(err) {
		throw err;
	}
};

/*
 * delete member by member db id
 *
 * @ Required params
 * @@ id/_id (String, Requried) : TrustMember's DB id
 *
 * @ return deleted Member Object
 *
 */
const deleteMemberById = async (id) => {
	try {
		let member = await TrustMember.findOne({
			_id: id
		});

		if (!member)
			throw new Error(Errors.MEMBER_NOT_FOUND);

		await TrustMember.deleteOne({
			_id: member._id
		});

		return member;
	} catch(err) {
		throw err;
	}
};

module.exports = {
	requestTrustMember,
	acceptOrAddTrustMember,
	findAllUserTrustMembers,
	findAllUserTrustMembersByStatus,
	deleteMemberById
};