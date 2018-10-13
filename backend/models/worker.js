var mongoose = require('mongoose');

var WorkerSchema = new mongoose.Schema({
    fullName: {
        type: String,
    },
    gender: {
        type: String,
    },
    contactInfo: {
        type: String,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    salary: {
        type: Number,
    },
    position: {
        type: String,
    },
});

mongoose.model('Worker', WorkerSchema);

module.exports = mongoose.model('Worker');