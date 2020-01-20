const express = require('express');

const route = express();

route.post('/', require('./request.member'));
route.get('/:status', require('./get.member'));
route.patch('/', require('./update.member'));
route.delete('/:id', require('./remove.member'));

module.exports = route;
