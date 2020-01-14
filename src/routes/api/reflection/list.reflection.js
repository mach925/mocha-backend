const { ReflectionService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    if (req.params.type) {
      const reflections = await ReflectionService.findUserReflectionsByType({ type: req.params.type, _id: req.user._id });
      res.success({
        reflections
      });
    } else {
      const reflections = await ReflectionService.findAllUserReflections({ _id: req.user._id });
      res.success({
        reflections
      });
    }
  } catch(err) {
    res.error({
      message: 'api.reflection.get-list.fail'
    });
  }
};
