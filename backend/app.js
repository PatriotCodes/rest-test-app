var express = require('express');
var db = require('./utils/db');
var cors = require('cors');
var bodyParser = require('body-parser');
var passport = require('passport');

var app = express();
app.use(cors());

require('./models/auth');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var userController = require('./controllers/userController');
app.use('/users', passport.authenticate('jwt', {session: false}), userController);

var authController = require('./controllers/authController');
app.use('/auth', authController);

var workerController = require('./controllers/workerController');
app.use('/workers', passport.authenticate('jwt', {session: false}), workerController);

module.exports = app;