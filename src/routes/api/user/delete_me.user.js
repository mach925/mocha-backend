const { ProfileService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    const user = await ProfileService.deleteProfile({ id: req.user._id });
    res.success({
      user
    });
  } catch(err) {
    res.error({
      message: 'api.user.delete-profile.fail'
    }, 500);
  }
};
