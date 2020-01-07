const express = require('express');

const route = express();

route.post('/signup-request', require('./request.auth'));
route.post('/signup-confirm', require('./confirm.auth'));

module.exports = route;
