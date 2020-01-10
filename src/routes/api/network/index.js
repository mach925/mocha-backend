const express = require('express');

const route = express();

route.post('/create', require('./create.network'));
route.get('/get/:id', require('./get.network'));
route.patch('/:id', require('./update.network'));
route.delete('/:id', require('./remove.network'));
route.get('/list', require('./list.network'));

module.exports = route;
