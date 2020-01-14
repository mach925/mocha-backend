const { TrustNetworkService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    const network = await TrustNetworkService.updateTrustNetworkById({ ...req.body, id: req.params.id });
    res.success({
      network
    });
  } catch(err) {
    res.error({
      message: 'api.network.update.fail'
    });
  }
};
