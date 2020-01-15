const { FeedbackService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    await FeedbackService.createFeedbacks({ ...req.body, sender: req.user });
    res.success();
  } catch(err) {
    res.error({
      message: 'api.feedback.create.fail'
    });
  }
};
