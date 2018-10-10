var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcrypt');

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

UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

UserSchema.methods.isValidPassword = async function(password) {
    var user = this;
    bcrypt.compare(password, user.password).then(function(res) {
        return res;
    });
};

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');