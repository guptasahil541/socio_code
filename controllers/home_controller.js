const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = function(req, res){
    // console.log(req.cookies);
    // res.cookie('user_id', 23);
    // Post.find({}, function(err, post){
    //     if(err){
    //         console.log(err);
    //         return;
    //     }
    //     return res.render('home', {
    //         title: 'home',
    //         post: post
    //     });
    // });

    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    .exec(function(err, posts){
        if(err){
            console.log(err);
            return;
        }
        User.find({}, function(err, users){
            if(err){
                console.log(err);
                return;
            }
            return res.render('home', {
                title: 'home',
                posts: posts,
                all_users: users
            });
        })
    });
}