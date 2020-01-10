module.exports = (req, res, next) => {
  res.success = function(data) {
    this.status(200).json({
      result: 'ok',
      data
    })
  };
  res.error = function(data, statusCode=404) {
    this.status(statusCode).json({
      result: 'error',
      data
    })
  };
  next();
};
