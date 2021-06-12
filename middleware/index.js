var User        = require('../models/user');

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    // req.flash('error', 'You need to sign in first!');
    res.redirect('/login');
};

middlewareObj.checkAdmin = function(req, res, next){
    if(req.isAuthenticated()){
        User.findById(req.user._id, function(err, currentUser){
            if(err){
                // req.flash('error', 'You can not acess this page!');
                res.redirect('/');
            } else {
                if( currentUser.isAdmin == true ){
                    return next();
                }
            }
        });
    } else {
        // req.flash('error', 'You need to sign in first!');
        res.redirect('/');
    }
};

middlewareObj.checkProfileOwner = function(req, res, next){
    if(req.isAuthenticated()){
        if( req.user._id.equals(req.params.id) ){
            return next();
        }
        else {
            req.flash('error', 'You are not the profile owner!');
            res.redirect('/back');
        }
    } else {
        req.flash('error', 'You need to sign in first!');
        res.redirect('/login');
    }
};

module.exports = middlewareObj;