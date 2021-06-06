var express     = require('express'),
    router      = express.Router({mergeParams: true}),
    passport    = require('passport'),
    Movies      = require('../models/movies'),
    Comment     = require('../models/comment'),
    middleware = require('../middleware');

router.post('/', middleware.isLoggedIn, function(req, res){
    Movies.findById(req.params.id, function(err, foundMovies){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    foundMovies.comments.push(comment);
                    foundMovies.save();
                    res.redirect('back');
                }
            });
        }
    });
});

module.exports = router;