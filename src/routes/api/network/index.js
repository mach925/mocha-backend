const express = require('express');

const route = express();

route.post('/', require('./create.network'));
route.get('/:id', require('./get.network'));
route.patch('/:id', require('./update.network'));
route.delete('/:id', require('./remove.network'));
route.get('/list', require('./list.network'));

module.exports = route;
