const express = require('express');

const route = express();

route.post('/create', require('./create.reflection'));
route.patch('/update/:id', require('./update.reflection'));
route.delete('/remove/:id', require('./remove.reflection'));
route.get('/list/:type', require('./list.reflection'));
route.get('/list-shared', require('./list_shared.reflection'));

module.exports = route;
