const { ProfileService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    const users = await ProfileService.findAllUsers();
    res.success({
      users
    });
  } catch(err) {
    res.error({
      message: 'api.user.get-all.fail'
    });
  }
};
