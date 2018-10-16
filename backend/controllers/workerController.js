var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

var worker = require('../models/worker');

// GET ALL
router.get('/', function (req, res) {
    let pageNo = parseInt(req.query.pageNo);
    let size = parseInt(req.query.size);
    let query = {};
    if(pageNo < 0 || pageNo === 0) {
        let response = {"error" : true,"message" : "invalid page number, should start with 1"};
        return res.json(response)
    }
    query.skip = size * (pageNo - 1);
    query.limit = size;
    worker.count({},function(err,totalCount) {
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"}
        }
        worker.find({},{},query,function(err,data) {
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                let totalPages = Math.ceil(totalCount / size);
                response = {"error" : false,"message" : data,"pages": totalPages};
            }
            res.json(response);
        });
    })
});

// CREATE
router.post('/', function (req, res) {
    worker.create({
            fullName: req.body.fullName,
            gender: req.body.gender,
            contactInfo: req.body.contactInfo,
            dateCreated: req.body.dateCreated,
            salary: req.body.salary,
            position: req.body.position
        },
        function (err, worker) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(worker);
        });
});

// GET BY ID
router.get('/:id', function (req, res) {
    worker.findById(req.params.id, function (err, worker) {
        if (err) return res.status(500).send("There was a problem finding the worker.");
        if (!user) return res.status(404).send("No worker found.");
        res.status(200).send(worker);
    });
});

// DELETE
router.delete('/:id', function (req, res) {
    worker.findByIdAndRemove(req.params.id, function (err, worker) {
        if (err) return res.status(500).send("There was a problem deleting the worker.");
        res.status(200).send(worker);
    });
});

// UPDATE
router.put('/:id', function (req, res) {
    worker.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, worker) {
        if (err) return res.status(500).send("There was a problem updating the worker.");
        res.status(200).send(worker);
    });
});

router.get('/search/:query', function (req, res) {
    worker.find({$text: {
            $search: req.params.query
        }} , function(err, workers) {
        if (err) return res.status(500).send("There was a problem searching workers.");
        res.status(200).send(workers);
    });
});

module.exports = router;