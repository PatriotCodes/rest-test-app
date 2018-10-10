const passport = require('passport');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

var user = require('./user');

passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password'
    },
    function (login, password, cb) {
        return user.findOne({login})
            .then(user => {
                if (!user) {
                    return cb(null, false, {message: 'User with such login is not found.'});
                }
                if (user.isValidPassword(password)) {
                    return cb(null, user.toJSON(), {message: 'Logged In Successfully'});
                } else {
                    return cb(null, false, {message: 'Wrong Password.'});
                }
            })
            .catch(err => cb(err));
    }
));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: 'your_jwt_secret'
    },
    function (jwtPayload, cb) {
        return user.findById(jwtPayload._id)
            .then(user => {
                if (user) {
                    return cb(null, user);
                } else {
                    return cb(null, false);
                }
            })
            .catch(err => {
                return cb(err);
            });
    }
));