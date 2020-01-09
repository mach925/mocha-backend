const { ReflectionService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    console.log('userId = ', req.user);
    const reflections = await ReflectionService.findAllUserReflections({ type: req.params.type, _id: req.user._id });
    res.success({
      reflections
    });
  } catch(err) {
    res.error({
      message: 'api.reflection.get-list.fail'
    }, 500);
  }
};
