const express = require('express')

const route = express()

route.use(require('../../middleware/auth.middleware'))

route.use('/auth', require('./auth'))

module.exports = route;
