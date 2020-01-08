module.exports = (req, res) => {
  res.success({ user: req.user });
};
