var express     = require('express'),
    router      = express.Router(),
    passport    = require('passport')
    Movies      = require('../models/movies'),
    User        = require('../models/user');

router.get('/', function(req, res){
    Movies.find({show: 'y'}, function(err, nowShowMovies){
        if(err){
            console.log(err);
        } else {
            Movies.find().sort({score: -1}).limit(5).exec(function(err, rankMovies){
                if(err){
                    console.log(err);
                } else {
                    Movies.find({show: 'n'}, function(err, comingSoonMovies){
                        if(err){
                            console.log(err);
                        } else {
                            res.render('./index/home.ejs', {Movies: nowShowMovies, ComeMovies: comingSoonMovies, Ranks: rankMovies});
                        }
                    });
                }
            });
        }
    });
});

router.get('/register', function(req, res){
    res.render('./index/register.ejs');
});

router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username, email: req.body.email});
    if(req.body.username === 'Admin'){
        if(req.body.password === '210120'){
            newUser.isAdmin = true;
        }
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message);
            return res.render('./index/register.ejs');
        } else {
            passport.authenticate('local')(req, res, function(){
                req.flash('success', 'Welcome to IMove ' + user.username);
                res.redirect('/');
            });
        }
    });
});

router.get('/login', function(req, res){
    res.render('./index/login.ejs');
});

router.post('/login', passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/login',
        successFlash: true,
        failureFlash: true,
        successFlash: 'Successfully log in',
        failureFlash: 'Invalid username or password',
    }), function(res, req){
});

router.get('/logout', function(req, res){
    req.logout();
    req.flash('success', 'Bye-bye and Come back to us again');
    res.redirect('back');
});

module.exports = router;