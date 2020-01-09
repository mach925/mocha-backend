/*
 This file provides apis related with trust network.
*/
import { TrustNetwork } from '../../models/trustNetwork.model';
import Errors from '../../constants/error.constant';

/*
 * Creat user's trust network
 *
 * @ Required params
 * @@ _id/id (String, Required) : user's db id
 * @@ members (String Array, Required) : db ids of users to be included.
 * @@ title(String, Required) : title of trust network
 * @@ reflections (String Array, Required) : reference model types of reflection model
 * @@ tags (String Array, Required) : tags of trust network.
 * @@ vulnerability (Integer, Required) : vulnerability level of turst network. Reference reflection model.
 *
 * @ return created TrustNetwork Object
 *
 */
const createUserTrustNetwork = async ({...params}) => {
	const {
		_id,
		id,
		members,
		name,
		reflections,
		tags,
		vulnerability
	} = params;

	try {
		const ownerDbId = TrustNetwork.convertToDbId(_id || id);
		
		const network = await TrustNetwork.create({
			owner: ownerDbId,
			members,
			name,
			reflections,
			tags,
			vulnerability
		});
				
		return network;
	} catch (err) {
		throw err;
	}
};

/*
 * returns all trust networks of user,
 *
 * @ Required params
 * @@ id/_id (String, Requried) : User's DB id
 *
 * @ return List of TrustNetwork Object
 *
 */
const findAllUserTrustNetworks = async ({...params}) => {
	try {
		const {
			_id,
			id,
		} = params;

		let networks = await TrustNetwork.find({
			owner: _id || id
		});

		return networks;
	} catch(err) {
		throw err;
	}
};

/*
 * returns all trust networks including user,
 *
 * @ Required params
 * @@ id/_id (String, Requried) : User's DB id
 *
 * @ return List of TrustNetwork Object
 *
 */
const findTrustNetworksIncludingUser = async (id) => {
	try {
		const userDbId = TrustNetwork.convertToDbId(id);
		
		if (!userDbId)
			throw new Error(Errors.PROFILE_NOT_FOUND);

		let networks = await TrustNetwork.find({
			members: userDbId
		});

		return networks;
	} catch(err) {
		throw err;
	}
};

/*
 * returns trust network by network db id
 *
 * @ Required params
 * @@ id/_id (String, Requried) : network's DB id
 *
 * @ return TrustNetwork Object
 *
 */
const findTrustNetworkById = async (id) => {
	try {
		let network = await TrustNetwork.findOne({
			_id: id
		});

		return network;
	} catch(err) {
		throw err;
	}
};

/*
 * updates trust network by network db id
 *
 * @ Required params
 * @@ id/_id (String, Requried) : network's DB id
 * @@ members (String Array, Required) : db ids of users to be included.
 * @@ title(String, Required) : title of trust network
 * @@ reflections (String Array, Required) : reference model types of reflection model
 * @@ tags (String Array, Required) : tags of trust network.
 * @@ vulnerability (Integer, Required) : vulnerability level of turst network. Reference reflection model.
 *
 * @ return TrustNetwork Object
 *
 */
const updateTrustNetworkById = async ({...params}) => {
	try {
		const {
			id, 
			_id,
			members,
			name,
			reflections,
			tags,
			vulnerability
		} = params;

		let network = await TrustNetwork.findOne({
			_id: id || _id
		});

		if (!network) 
			throw new Error(Errors.NETWORK_NOT_FOUND);

		network.members = members || network.members;
		network.name = title || network.name;
		network.reflections = reflections || network.reflections;
		network.tags = tags || network.tags;
		network.vulnerability = 
			vulnerability === undefined 
				? network.vulnerability 
				: vulnerability;

		await network.save();

		return network;
	} catch(err) {
		throw err;
	}
};

/*
 * delete trust network by network db id
 *
 * @ Required params
 * @@ id/_id (String, Requried) : network's DB id
 *
 * @ return deleted TrustNetwork Object
 *
 */
const deleteTrustNetworkById = async (id) => {
	try {
		let network = await TrustNetwork.findOne({
			_id: id
		});

		if (!network) 
			throw new Error(Errors.NETWORK_NOT_FOUND);

		await TrustNetwork.deleteOne({
			_id: network._id
		});

		return network;
	} catch(err) {
		throw err;
	}
};

module.exports = {
	createUserTrustNetwork,
	deleteTrustNetworkById,
	findAllUserTrustNetworks,
	findTrustNetworkById,
	findTrustNetworksIncludingUser,
	updateTrustNetworkById,
};