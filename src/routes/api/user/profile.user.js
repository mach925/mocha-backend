const { ProfileService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    const user = await ProfileService.findProfileById(req.params.id);
    res.success({
      user
    });
  } catch(err) {
    res.error({
      message: 'api.user.get-profile.fail'
    });
  }
};
