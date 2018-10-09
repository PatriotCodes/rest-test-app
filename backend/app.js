var express = require('express');
var app = express();
var db = require('./utils/db');

var userController = require('./controllers/userController');
app.use('/users', userController);

module.exports = app;