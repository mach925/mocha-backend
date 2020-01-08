const express = require('express');

const route = express();

route.get('/get', require('./get.reflection'));
route.post('/update', require('./update.reflection'));

module.exports = route;
