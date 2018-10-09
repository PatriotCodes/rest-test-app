var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var user = require('../models/user');

// GET ALL
router.get('/', function (req, res) {
    user.find({}, function (err, users) {
        if (err) return res.status(500).send("There was a problem receiving users.");
        res.status(200).send(users);
    });
});

// CREATE
router.post('/', function (req, res) {
    user.create({
            login : req.body.login,
            email : req.body.email,
            password : req.body.password
        },
        function (err, user) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(user);
        });
});

// GET BY ID
router.get('/:id', function (req, res) {
    user.findById(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        res.status(200).send(user);
    });
});

// DELETE
router.delete('/:id', function (req, res) {
    user.findByIdAndRemove(req.params.id, function (err, user) {
        if (err) return res.status(500).send("There was a problem deleting the user.");
        res.status(200).send("User "+ user.name +" was deleted.");
    });
});

// UPDATE
router.put('/:id', function (req, res) {
    user.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err) return res.status(500).send("There was a problem updating the user.");
        res.status(200).send(user);
    });
});

module.exports = router;
