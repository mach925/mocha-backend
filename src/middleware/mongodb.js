'use strict'
/*
 This file is one for connection to mongodb.
*/

const mongoose = require('mongoose');
const config = require('../config/database.config');
mongoose.connect(config.uri, config.option);

console.log("DB config : ", config);

mongoose.connection.on('error', (err) => {
	console.log(err);
});

mongoose.connection.on('disconnected', () => {
	console.log('Mongoose default connection disconnected');
});

module.exports = mongoose.connection;
