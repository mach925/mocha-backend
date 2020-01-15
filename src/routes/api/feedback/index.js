const express = require('express');

const route = express();

route.post('/', require('./create.feedbacks'));
route.get('/', require('./get.feedbacks'));
route.patch('/:id', require('./update.feedback'));
// route.delete('/:groupId', require('./delete.feedbacks'));

module.exports = route;
