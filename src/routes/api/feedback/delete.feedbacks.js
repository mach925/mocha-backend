const { FeedbackService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    await FeedbackService.deleteFeedbacksByGroupId({ ...req.body, groupId: req.params.groupId });
    res.success();
  } catch(err) {
    res.error({
      message: 'api.feedback.delete.fail'
    });
  }
};
