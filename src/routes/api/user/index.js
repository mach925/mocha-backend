const express = require('express');

const route = express();

route.get('/me', require('./me.user'));
route.patch('/me', require('./update_me.user'));

module.exports = route;
