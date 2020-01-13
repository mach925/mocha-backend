/*
 This file provides apis related with reflection.
*/
import TrustNetworkService from './trustNetwork.service';
import { Reflection } from '../../models/reflection.model';
import Errors from '../../constants/error.constant';

/*
 * Create user's reflection
 *
 * @ Required params
 * @@ id/_id (String, required) - db id of user creating reflection
 * @@ type (String, required)
 * @@ data (Object, required)
 *
 * @ return created Reflection Object
 *
 */
const createReflection = async ({...params}) => {
	const {
		ownerId,
		type,
		data
	} = params;

	try {
		let ownerDbId = Reflection.convertToDbId(ownerId);

		if (!ownerDbId)
			throw new Error(Errors.PROFILE_NOT_FOUND);

		const reflection = await Reflection.create({
			owner: ownerDbId,
			type,
			data
		});

		return reflection;
	} catch (err) {
		throw err;
	}
};

/*
 * Add user's reflections
 *
 * @ Required params
 * @@ ownerId (String, required) - db id of user creating reflection
 * @@ data (Object, required)
 *
 * @ return array of reflections
 *
 */
const addReflections = async (params) => {
	const {
		ownerId,
		data
	} = params;

	try {
		let ownerDbId = Reflection.convertToDbId(ownerId);

		if (!ownerDbId)
			throw new Error(Errors.PROFILE_NOT_FOUND);

		for (const [type, values] of Object.entries(data)) {
			for (const reflectionData of values) {
				await createReflection({
					ownerId: ownerDbId,
					type: type.charAt(0).toUpperCase() + type.slice(1),
					data: reflectionData
				});
			}
		}

		return findAllUserReflections({ _id: ownerId });
	} catch (err) {
		throw err;
	}
};

/*
 * return all reflections of user,
 *
 * @ Required params
 * @@ id/_id (String, Requried) : User's DB id
 *
 * @ return List of Reflection Object
 *
 */
const findAllUserReflections = async ({...params}) => {
	try {
		const {
			_id,
			id
		} = params;

		let reflections = await Reflection.find({
			owner: _id || id
		});

		return reflections;
	} catch(err) {
		throw err;
	}
};

/*
 * return all reflections of user for specific type,
 *
 * @ Required params
 * @@ id/_id (String, Requried) : User's DB id
 * @@ type (String, Requried) : reflection type
 *
 * @ return List of Reflection Object
 *
 */
const findUserReflectionsByType = async ({...params}) => {
	try {
		const {
			_id,
			id,
			type
		} = params;

		let reflections = await Reflection.find({
			owner: _id || id,
			type
		});

		return reflections;
	} catch(err) {
		throw err;
	}
};

/*
 * return reflection by reflection db id
 *
 * @ Required params
 * @@ id/_id (String, Requried) : reflection's DB id
 *
 * @ return reflection Object
 *
 */
const findReflectionById = async (id) => {
	try {
		let reflection = await Reflection.findOne({
			_id: id
		});

		return reflection;
	} catch(err) {
		throw err;
	}
};



/*
 * return reflection which will be displayed to user by user db id
 *
 * @ Required params
 * @@ id (String : required)
 *
 * @ return reflection Object
 *
 */
const findSharedReflections = async ({...params}) => {
	try {
		const {
			_id,
			id
		} = params;

		const networks = await TrustNetworkService.findNetworksIncludingUser( _id || id );

		const matches = {$or: []};
		for (let network of networks) {
			const match = {}
			if (network.owner)
				match.owner = network.owner;

			if (
				network.tags &&
				network.tags !== []
			) {

				match['data.tags'] = { $in: network.tags.concat(null) };
			}
			if (
				network.vulnerability !== undefined &&
				network.vulnerability !== null
			) {

				match['data.vulnerability'] = { $in: [null, network.vulnerability] };
			}

			matches.$or.push(match);
		};

		const reflections = await Reflection.find(matches);

		return reflections;
	} catch(err) {
		throw err;
	}
};

/*
 * Update reflection by db id
 *
 * @ Required params
 * @@ id/_id (String, required) - db id of reflection
 * @@ data (Object, optional)
 *
 * @ return updated Reflection Object
 *
 */
const updateReflectionById = async ({...params}) => {
	const {
		id,
		_id,
		data
	} = params;

	try {
		let reflection = await Reflection.findOne({
			_id: id || _id
		});

		if (!reflection)
			throw new Error(Errors.REFLECTION_NOT_FOUND);

		reflection.data = data || reflection.data;

		await reflection.save();

		return reflection;
	} catch (err) {
		throw err;
	}
};

/*
 * Update reflections
 *
 * @ Required params
 * @@ ownerId (String) : ownerId got from token
 * @@ data (Object, optional)
 *
 * @ return updated Reflection Object
 *
 */
const updateReflections = async ({...params}) => {
	const {
		data,
		ownerId
	} = params;

	try {
		for (const value of data) {
			await updateReflectionById({ id: value._id, data: value.data });
		}
		return findAllUserReflections({ _id: ownerId });
	} catch (err) {
		throw err;
	}
};

/*
 * delete reflection by reflection db id
 *
 * @ Required params
 * @@ id/_id (String, Requried) : reflection's DB id
 *
 * @ return deleted Reflection Object
 *
 */
const deleteReflectionById = async (id) => {
	try {
		let reflection = await Reflection.findOne({
			_id: id
		});

		if (!reflection)
			throw new Error(Errors.REFLECTION_NOT_FOUND);

		await Reflection.deleteOne({
			_id: reflection._id
		});

		return reflection;
	} catch(err) {
		throw err;
	}
};

/*
 * delete reflections
 *
 * @ Required params
 * @@ ownerId (String) : ownerId got from token
 * @@ data (Object, Requried) : array of reflection's DB id
 *
 * @ return deleted Reflection Object
 *
 */
const deleteReflections = async (params) => {
	const {
		data,
		ownerId
	} = params;

	try {
		for (const id of data) {
			await deleteReflectionById(id);
		}
		return findAllUserReflections({ _id: ownerId });
	} catch(err) {
		throw err;
	}
};

/*
 * Reset user's tap count to zero
 *
 * @ Required params
 * @@ id/_id (String, Requried) : user's DB id
 *
 * @ return null
 *
 */
const resetTapCount = async (id) => {
	try {
		await Reflection.updateMany({
			owner: id,
			type: Reflection.MODEL_TAP
		}, {
			$set: {
				'data.week_count': 0
			}
		});

		return;
	} catch(err) {
		throw err;
	}
};

module.exports = {
	createReflection,
	addReflections,
	deleteReflectionById,
	deleteReflections,
	findAllUserReflections,
	findUserReflectionsByType,
	findReflectionById,
	findSharedReflections,
	resetTapCount,
	updateReflectionById,
	updateReflections
};
