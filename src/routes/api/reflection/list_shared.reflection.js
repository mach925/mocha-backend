const { ReflectionService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    const reflections = await ReflectionService.findSharedReflections({ id: req.user._id });
    res.success({
      reflections
    });
  } catch(err) {
    res.error({
      message: 'api.reflection.get-shared-list.fail'
    });
  }
};
