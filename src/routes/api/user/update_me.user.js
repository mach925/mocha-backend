const { ProfileService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    const user = await ProfileService.updateProfile({ ...req.body, id: req.user._id });
    res.success({
      user
    });
  } catch(err) {
    res.error({
      message: 'api.user.update-profile.fail'
    });
  }
};
