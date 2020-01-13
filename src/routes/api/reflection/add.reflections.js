const { ReflectionService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    const reflections = await ReflectionService.addReflections({ ...req.body, ownerId: req.user._id });
    res.success({
      reflections
    });
  } catch(err) {
    res.error({
      message: err.message //'api.reflection.add-array.fail'
    }, 500);
  }
};
