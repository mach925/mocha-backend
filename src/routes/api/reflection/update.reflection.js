const { ReflectionService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    const reflection = await ReflectionService.updateReflectionById({ ...req.body, id: req.params.id });
    res.success({
      reflection
    });
  } catch(err) {
    res.error({
      message: 'api.reflection.update.fail'
    }, 500);
  }
};
