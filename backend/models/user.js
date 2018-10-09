var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
    login: {
        type: String,
        required: [true, "can't be blank."],
        unique: true,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true,
    },
    email: {
        type: String,
        required: [true, "can't be blank."],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    password: String
});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');