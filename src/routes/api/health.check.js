const dbconnection = require('../../middleware/mongodb');

module.exports = async (req, res) => {
  try {
    if (dbconnection.readyState === 1) {
      res.success();
    } else {
      res.error();
    }
  } catch(err) {
    res.error({
      message: 'api.healthcheck.fail'
    }, 500);
  }
};
