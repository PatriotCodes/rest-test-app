const express = require('express');
const router  = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');
var user = require('../models/user');

// test qwerty
// LOGIN
router.post('/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user   : user
            });
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(user, 'your_jwt_secret');
            return res.json({user, token});
        });
    })(req, res);
});

// REGISTRATION
router.post('/register', function (req, res) {
    user.create({
            login : req.body.login,
            email : req.body.email,
            password : req.body.password
        },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem creating account.");
            res.status(200).send(user);
        });
});

module.exports = router;
