const { FeedbackService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    const feedback = await FeedbackService.updateFeedback({ ...req.body, id: req.params.id });
    res.success({
      feedback
    });
  } catch(err) {
    res.error({
      message: 'api.feedback.update.fail'
    });
  }
};
