const { ReflectionService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    const reflection = await ReflectionService.deleteReflectionById(req.params.id);
    res.success({
      reflection
    });
  } catch(err) {
    res.error({
      message: 'api.reflection.remove.fail'
    });
  }
};
