const express = require('express');

const route = express();

route.post('/auth-request', require('./request.auth'));
route.post('/auth-confirm', require('./confirm.auth'));

module.exports = route;
