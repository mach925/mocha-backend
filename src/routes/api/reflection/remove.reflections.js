const { ReflectionService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    const reflections = await ReflectionService.deleteReflections({ ...req.body, ownerId: req.user._id });
    res.success({
      reflections
    });
  } catch(err) {
    res.error({
      message: 'api.reflection.remove-arrays.fail'
    });
  }
};
