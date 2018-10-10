var express = require('express');
var app = express();
var db = require('./utils/db');
var bodyParser = require('body-parser');
var passport = require('passport');

require('./models/auth');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var userController = require('./controllers/userController');
app.use('/users', passport.authenticate('jwt', {session: false}), userController);

var authController = require('./controllers/authController');
app.use('/auth', authController);

module.exports = app;