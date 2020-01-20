const { TrustMemberService } = require('../../../services');

module.exports = async (req, res) => {
  try {
    const member = await TrustMemberService.deleteMemberById(req.params.id);
    res.success({
      member
    });
  } catch(err) {
    res.error({
      message: 'api.member.remove.fail'
    });
  }
};
