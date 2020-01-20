const { TrustMemberService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    if (req.params.status) {
      const member = await TrustMemberService.findAllUserTrustMembersByStatus({ status:req.params.status, _id: req.user._id });
      res.success({
        member
      });
    } else {
      const member = await TrustMemberService.findAllUserTrustMembers({ _id: req.user._id });
      res.success({
        member
      });
    }
  } catch(err) {
    res.error({
      message: 'api.member.get.fail'
    });
  }
};
