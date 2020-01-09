const { ReflectionService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    const reflection = await ReflectionService.createReflection({ ...req.body });
    res.success({
      reflection
    });
  } catch(err) {
    res.error({
      message: err.message//'api.reflection.create.fail'
    }, 500);
  }
};
