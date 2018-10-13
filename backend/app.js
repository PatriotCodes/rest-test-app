var express = require('express');
var app = express();
var db = require('./utils/db');
var bodyParser = require('body-parser');
var passport = require('passport');

require('./models/auth');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

var userController = require('./controllers/userController');
app.use('/users', passport.authenticate('jwt', {session: false}), userController);

var authController = require('./controllers/authController');
app.use('/auth', authController);

module.exports = app;