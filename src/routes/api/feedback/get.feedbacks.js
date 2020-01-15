const { FeedbackService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    await FeedbackService.findFeedbacks(req.user._id);
    res.success();
  } catch(err) {
    res.error({
      message: 'api.feedback.get.fail'
    });
  }
};
