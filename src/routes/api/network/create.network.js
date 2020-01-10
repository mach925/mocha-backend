const { TrustNetworkService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    const network = await TrustNetworkService.createUserTrustNetwork({ ...req.body, ownerId: req.user._id });
    res.success({
      network
    });
  } catch(err) {
    res.error({
      message: 'api.network.create.fail'
    }, 500);
  }
};
