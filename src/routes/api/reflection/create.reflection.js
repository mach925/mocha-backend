const { ReflectionService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    const reflection = await ReflectionService.createReflection({ ...req.body, ownerId: req.user._id });
    res.success({
      reflection
    });
  } catch(err) {
    res.error({
      message: err.message//'api.reflection.create.fail'
    }, 500);
  }
};
