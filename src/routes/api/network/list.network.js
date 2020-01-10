const { TrustNetworkService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    const networks = await TrustNetworkService.findAllUserTrustNetworks({id: req.user._id});
    res.success({
      networks
    });
  } catch(err) {
    res.error({
      message: 'api.network.list.fail'
    }, 500);
  }
};
