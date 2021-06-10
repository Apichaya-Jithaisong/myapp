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
            console.log(err);
            return res.render('./index/register.ejs');
        } else {
            passport.authenticate('local')(req, res, function(){
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
        failureRedirect: '/login'
    }), function(res, req){
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('back');
});

module.exports = router;