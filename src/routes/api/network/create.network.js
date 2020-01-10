module.exports = async (req, res) => {
  try {
    res.success({
      networks: []
    });
  } catch(err) {
    res.error({
      message: 'api.user.update-profile.fail'
    }, 500);
  }
};
