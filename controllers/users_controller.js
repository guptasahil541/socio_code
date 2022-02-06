const User = require('../models/user');
const passport = require('passport');

module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'Profile'
    });
}

module.exports.signIn = function(req, res){
    if(req.isAuthenticated() == false){
        return res.render('user_sign_in', {
            title: 'Socio_Code | Sign In'
        });
    }
    return res.redirect('/users/profile');
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated() == false){
        return res.render('user_sign_up', {
            title: 'Socio_Code | Sign Up'
        });
    }
    return res.redirect('/users/profile');
}

module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log(err);
            return;
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log(err);
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });
}

module.exports.createSession = function(req, res){
    return res.redirect('/');
}