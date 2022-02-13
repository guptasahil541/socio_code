const Post = require('../models/post');
const Comment = require('../models/comment');

//************** Without async await **************

// module.exports.create = function(req, res){
//     Post.findById(req.body.post, function(err, post){
//         if(err){
//             console.log(err);
//             return;
//         }
//         if(post){
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             }, function(err, comment){
//                 if(err){
//                     console.log(err);
//                     return;
//                 }
//                 post.comments.push(comment);
//                 post.save();
//                 return res.redirect('back');
//             });    
//         }
//     });
// } 

// module.exports.destroy = function(req, res){
//     Comment.findById(req.params.id, function(err, comment){
//         if(err){
//             console.log(err);
//             return;
//         }
//         if(comment.user == req.user.id){
//             let postId = comment.post;
//             comment.remove();
//             Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}}, function(err, post){
//                 if(err){
//                     console.log(err);
//                     return;
//                 }
//                 return res.redirect('back');
//             });
//         }
//         else{
//             return res.redirect('back');
//         }
//     });
// }




//************** With async await **************

module.exports.create = async function(req, res){

    try {
        let post = await Post.findById(req.body.post);
    
        if(post){
            
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            return res.redirect('back');

        }

        else{
            return res.redirect('back');
        }
    } 
    catch (err) {
        console.log(err);
        return;
    }
           
} 

module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();
            let post = Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
            return res.redirect('back');
        }
        else{
            return res.redirect('back');
        }
    }

    catch(err){
        console.log(err);
        return;
    }

}