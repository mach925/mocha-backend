const { ReflectionService } = require('../../../services');

module.exports = async (req, res) => {
  try {
      const reflections = await ReflectionService.findAllUserReflections({ _id: req.params.id });
      res.success({
        reflections
      });
  } catch(err) {
    res.error({
      message: 'api.reflection.get-list.fail'
    });
  }
};
