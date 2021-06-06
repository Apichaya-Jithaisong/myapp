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

//  Register
router.get('/register', function(req, res){
    res.render('./index/register.ejs');
});

router.post('/register', function(req, res){
    var newUser = new User({username: req.body.username, email: req.body.email});
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

//  Login
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

router.get('/user/:id', function(req, res){
    User.findById(req.parans.id, function(err, foundUsre){
        if(err){
            req.flash('error', 'User not found');
            return res.redirect('/');
        }
        
    })
})

module.exports = router;