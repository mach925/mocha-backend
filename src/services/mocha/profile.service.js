/*
 This file provides apis related with profile.
*/
import { User } from '../../models/user.model';
import Errors from '../../constants/error.constant';

/*
 * Create new profile
 *
 * @ Required params
 * @@ phone (String : Required)
 * 
 * @ return created User Object
 *
 */
const createProfile = async ({...params}) => {
	const {
		phone,
		user_id, 				// Optional
		name, 					// Optional
		avatar					// Optional
	} = params;

	try {
		const user = await User.create({
			phone,
			user_id,
			name,
			avatar
		});

		// To do : Cache profile info

		return user;
	} catch (err) {
		throw err;
	}
};

/*
 * find profile by id/_id,
 *
 * @ Required params
 * @@ id/_id (String : Required)
 *
 * @ return User Object / null
 *
 */
const findProfileById = async (id) => {
	try {
		let user;
		// To do : find from cache

		if (!user) {
			user = await User.findOneById(id);
		}

		return user;
	} catch(err) {
		throw err;
	}
};

/*
 * find profile by phone,
 *
 * @ Required params
 * @@ phone (String : Required)
 *
 * @ return User Object / null
 *
 */
const findProfileByPhone = async (phone) => {
	try {
		let user;

		user = await User.findOne({
			phone: phone				
		});

		return user;
	} catch(err) {
		throw err;
	}
};

/*
 * find profile by user_id,
 *
 * @ Required params
 * @@ user_id (String : Required)
 *
 * @ return User Object / null
 *
 */
const findProfileByUserId = async (user_id) => {
	try {
		let user;

		user = await User.findOne({
			user_id: user_id				
		});

		return user;
	} catch(err) {
		throw err;
	}
};

/*
 * find profile by phone or user_id,
 *
 * @ Required params
 * @@phoneOrUserId  (String : Required)
 *
 * @ return User Object / null
 *
 */
const findProfileByPhoneorUserId = async (phoneOrUserId) => {
	try {
		let user;

		user = await User.findOne({
			$or: [
				{phone: phoneOrUserId},
				{user_id: phoneOrUserId}
			]
		});

		return user;
	} catch(err) {
		throw err;
	}
};

/*
 * Update new profile by id/_id,
 *
 * @ Required params
 * @@ id/_id (String : Required)
 *
 * @ return User Object
 *
 */
const updateProfile = async ({...params}) => {
	const {
		_id,
		id,
		name,
		avatar,
		point
	} = params;

	try {
		let user = await User.findOneById(_id || id);

		if(!user)
				throw new Error(Errors.PROFILE_NOT_FOUND);

		user.name = name || user.name;
		user.avatar = avatar || user.avatar;
		user.point = point === undefined ? user.point : point;

		await user.save();

		// To do : Update cache


		return user;
	} catch(err) {
		throw err;
	}

	return id || _id;
};

/*
 * Delete new profile by id/_id,
 *
 * @ Required params
 * @@ id/_id (String : Required)
 *
 * @ return User Object
 *
 */
const deleteProfile = async ({...params}) => {
	const {
		_id,
		id
	} = params;

	try {
		// To do : // delete user from cache

		let user = await User.findOneById(_id || id);

		if(!user)
				throw new Error(Errors.PROFILE_NOT_FOUND);
		await user.remove();

		return user;
	} catch(err) {
		throw err;
	}
};

module.exports = {
	createProfile,
	deleteProfile,
	findProfileByPhone,
	findProfileByPhoneorUserId,
	findProfileById,
	findProfileByUserId,
	updateProfile,
};