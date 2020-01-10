const { TrustNetworkService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    const network = await TrustNetworkService.findTrustNetworkById(req.params.id);
    res.success({
      network
    });
  } catch(err) {
    res.error({
      message: 'api.network.get.fail'
    }, 500);
  }
};
