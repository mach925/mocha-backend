const express = require('express');

const route = express();

route.get('/me', require('./me.user'));
route.get('/all', require('./all.user'));
route.get('/profile/:id', require('./profile.user'));
route.patch('/me', require('./update_me.user'));
route.patch('/pushtoken', require('./update_me.pushtoken'));
route.delete('/me', require('./delete_me.user'));

module.exports = route;
