const Post = require('../models/post');
const User = require('../models/user');

// module.exports.home = function(req, res){
//     // console.log(req.cookies);
//     // res.cookie('user_id', 23);
//     // Post.find({}, function(err, post){
//     //     if(err){
//     //         console.log(err);
//     //         return;
//     //     }
//     //     return res.render('home', {
//     //         title: 'home',
//     //         post: post
//     //     });
//     // });

// }


// ************** Without async await ****************

// module.exports.home = function(req, res){
   
//     Post.find({})
//     .populate('user')
//     .populate({
//         path: 'comments',
//         populate: {
//             path: 'user'
//         }
//     })
//     .exec(function(err, posts){
//         if(err){
//             console.log(err);
//             return;
//         }
//         User.find({}, function(err, users){
//             if(err){
//                 console.log(err);
//                 return;
//             }
//             return res.render('home', {
//                 title: 'home',
//                 posts: posts,
//                 all_users: users
//             });
//         })
//     });
// }


// ************** With async await ****************

module.exports.home = async function(req, res){

    try {
        let posts = await Post.find({})
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        let users = await User.find({});

        return res.render('home', {
        title: 'home',
        posts: posts,
        all_users: users
        }); 

    } catch (error) {
        console.log(error);
        return;
    }

       
}