const { TrustMemberService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    if (req.params.status) {
      const contacts = await TrustMemberService.findAllUserTrustMembersByStatus({ status:req.params.status, _id: req.user._id });
      res.success(
        contacts
      );
    } else {
      const contacts = await TrustMemberService.findAllUserTrustMembers({ _id: req.user._id });
      res.success(
        contacts
      );
    }
  } catch(err) {
    res.error({
      message: 'api.member.get.fail'
    });
  }
};
