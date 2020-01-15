const { FeedbackService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    await FeedbackService.deleteFeedbacksByGroupId(req.params.groupId);
    res.success();
  } catch(err) {
    res.error({
      message: 'api.feedback.update.fail'
    });
  }
};
