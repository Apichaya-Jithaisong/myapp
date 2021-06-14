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
                    req.flash('success', 'Your comment is add.');
                    res.redirect('back');
                }
            });
        }
    });
});


router.put('/:comid', function(req, res){
    Comment.findByIdAndUpdate(req.params.comid, req.body.comment, function( err, updatedComment ){
        if(err) {
            req.flash('error', 'An error occurred.');
            console.log(err);
        } else {
            req.flash('success', 'Edit success.');
            res.redirect('back');
        }
    });
});


router.delete('/:comid', function(req, res){
    Comment.findByIdAndRemove(req.params.comid, function(err){
        if(err){
            req.flash('error', 'An error occurred.');
            console.log(err);
        } else {
            req.flash('success', 'Successful deletion.');
            res.redirect('back');
        }
    })
});

module.exports = router;