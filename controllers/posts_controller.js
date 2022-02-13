const Post = require('../models/post');
const Comment = require('../models/comment');


// ************* Without async await **************

// module.exports.create = function(req, res){
//     Post.create({
//         content: req.body.content,
//         user: req.user.id
//     }, function(err, post){
//         if(err){
//             console.log(err);
//             return;
//         }
//         return res.redirect('back');
//     });
// } 

// module.exports.destroy = function(req, res){
//     Post.findById(req.params.id, function(err, post){
//         if(err){
//             console.log(err);
//             return;
//         }
//         if(post.user == req.user.id){
//             post.remove();
//             Comment.deleteMany({post: req.params.id}, function(err){
//                 return res.redirect('back');
//             });
//         }
//         else{
//             return res.redirect('back');
//         }
//     });
// }




// ************* With async await **************

module.exports.create = async function(req, res){
    try {

        let post = await Post.create({
            content: req.body.content,
            user: req.user.id
        });
        return res.redirect('back');

    } catch (error) {
        
        console.log(error);
        return;

    }    
} 

module.exports.destroy = async function(req, res){

    try {

        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            let comment = await Comment.deleteMany({post: req.params.id});
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }

    } catch (error) {
        
        console.log(error);
        return;

    }  

}

