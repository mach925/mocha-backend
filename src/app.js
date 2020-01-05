const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// connect MongoDB
const dbconnection = require('./middleware/mongodb');

// express app
const app = express();
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: false }));
app.use(cors({credentials:true, origin: true, optionsSuccessStatus: 200}));
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', req.headers.origin);
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,');
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   next();
// });

module.exports = app;
