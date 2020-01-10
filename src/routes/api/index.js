const express = require('express');

const route = express();

route.use(require('../../middleware/response'));
route.use(require('../../middleware/auth.middleware'));

route.use('/auth', require('./auth'));
route.use('/user', require('./user'));
route.use('/network', require('./network'));

module.exports = route;
