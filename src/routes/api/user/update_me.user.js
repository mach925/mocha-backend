const { ProfileService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    const updatedUser = await ProfileService.updateProfile({ ...req.body, id: req.user._id });
    res.success({
      updatedUser
    });
  } catch(err) {
    res.error({
      message: 'api.user.update-profile.fail'
    }, 500);
  }
};
