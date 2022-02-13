const User = require('../models/user');
const Post = require('../models/post');
const passport = require('passport');


// ************* Without async await **************

// module.exports.profile = function(req, res){
//     User.findById(req.params.id, function(err, user){
//         if(err){
//             console.log(err);
//             return;
//         }
//         return res.render('user_profile', {
//             title: 'Profile',
//             profile_user: user
//         });
//     });
// }

// module.exports.update = function(req, res){
//     if(req.user.id == req.params.id){
//         User.findByIdAndUpdate(req.params.id, req.body, function(err, user){
//             if(err){
//                 console.log(err);
//                 return;
//             }
//             return res.redirect('back');
//         });
//     }
//     else{
//         return res.status('401').send('Unauthorized');
//     }
// }

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

// module.exports.create = function(req, res){
//     if(req.body.password != req.body.confirm_password){
//         return res.redirect('back');
//     }
//     User.findOne({email: req.body.email}, function(err, user){
//         if(err){
//             console.log(err);
//             return;
//         }
//         if(!user){
//             User.create(req.body, function(err, user){
//                 if(err){
//                     console.log(err);
//                     return;
//                 }
//                 return res.redirect('/users/sign-in');
//             });
//         }
//         else{
//             return res.redirect('back');
//         }
//     });
// }



// ************* With async await **************

module.exports.profile = async function(req, res){
    try {
        let user = await User.findById(req.params.id);
        return res.render('user_profile', {
            title: 'Profile',
            profile_user: user
        });
    } 
    catch (error) {
        console.log(error);
        return;
    }
}

module.exports.update = async function(req, res){

    try {
        if(req.user.id == req.params.id){
            let user = await User.findByIdAndUpdate(req.params.id, req.body);
            return res.redirect('back');
        }
        else{
            return res.status('401').send('Unauthorized');
        }
    } 
    catch (error) {
        console.log(error);
        return;
    }

}

module.exports.create = async function(req, res){
    try {
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
        let user = await User.findOne({email: req.body.email});
        if(!user){
            let user = await User.create(req.body);
            return res.redirect('/users/sign-in');
        }
        else{
            return res.redirect('back');
        }

    } 
    catch (error) {
        console.log(error);
        return;
    }

}


// ************* With async await **************


module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');
}
