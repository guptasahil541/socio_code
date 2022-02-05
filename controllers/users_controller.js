module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'Profile'
    });
}

module.exports.signIn = function(req, res){
    return res.render('user_sign_in', {
        title: 'Socio_Code | Sign In'
    });
}

module.exports.signUp = function(req, res){
    return res.render('user_sign_up', {
        title: 'Socio_Code | Sign Up'
    });
}