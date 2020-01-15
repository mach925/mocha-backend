const { FeedbackService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    const feedbacks = await FeedbackService.findFeedbacks(req.user._id);
    res.success({
      feedbacks
    });
  } catch(err) {
    res.error({
      message: 'api.feedback.get.fail'
    });
  }
};
