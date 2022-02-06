//Requiring passport and local
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//Requiring user model
const User = require('../models/user');

//Passport setup middleware
passport.use(new LocalStrategy({
    //By default usernameField = username so that why overriding it
    usernameField: 'email'
}, 
function(email, password, done){
    //First email is from User second is from passport
    User.findOne({email: email}, function(err, user){
        if(err){
            console.log(err);
            return done(err);
        }
        //If user is not found or password don't match
        if(!user || user.password != password){
            console.log('Invalid username/password');
            return done(null, false);
        }
        //If user is found
        return done(null, user);
    });
}));

//Serializing user for storing his key in cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//Deserializing user for removing his key from the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){
            console.log(err);
            return done(err);
        }
        return done(null, user);
    });
});

module.exports = passport;