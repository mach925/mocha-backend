const { Reflection } = require('../../../models/reflection.model')

module.exports = async (req, res) => {
  try {
    const reflection = await Reflection.findOne({ owner: req.user._id });

    const { usermanuals, }

    if (reflection) {

    }
    res.success({
      reflection: reflection || []
    });
  } catch(err) {
    res.error({
      message: err.message
    });
  }
};
