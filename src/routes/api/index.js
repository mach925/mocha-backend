const express = require('express');

const route = express();

route.use(require('../../middleware/response'));
route.use(require('../../middleware/auth.middleware'));

route.use('/auth', require('./auth'));
route.use('/user', require('./user'));
route.use('/network', require('./network'));
route.use('/reflection', require('./reflection'));
route.use('/feedback', require('./feedback'));
route.use('/member', require('./trustmember'));

route.get('/health-check', require('./health.check'));

module.exports = route;
