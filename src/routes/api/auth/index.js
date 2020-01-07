const express = require('express')

const route = express()

route.post('/send-sms', require('./send.sms'))
route.post('/validate-sms', require('./validate.sms'))

module.exports = route
