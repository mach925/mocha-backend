const { TrustMemberService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    const member = await TrustMemberService.requestTrustMember({ ...req.body, from: req.user._id });
    res.success({
      member
    });
  } catch(err) {
    res.error({
      message: 'api.member.request.fail'
    });
  }
};
