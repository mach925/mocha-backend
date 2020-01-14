const express = require('express');

const route = express();

route.post('/', require('./create.reflection'));
route.patch('/:id', require('./update.reflection'));
route.delete('/:id', require('./remove.reflection'));
route.get('/list/:type', require('./list.reflection'));
route.get('/list', require('./list.reflection'));
route.get('/list-shared', require('./list_shared.reflection'));
route.post('/add', require('./add.reflections'));
route.post('/update', require('./update.reflections'));
route.post('/remove', require('./remove.reflections'));

module.exports = route;
