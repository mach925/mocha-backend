const { TrustMemberService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    const member = await TrustMemberService.acceptOrAddTrustMember({ ...req.body, owner: req.user._id });
    res.success({
      member
    });
  } catch(err) {
    res.error({
      message: 'api.member.add.fail'
    });
  }
};
