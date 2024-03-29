var express = require('express'),
    router  = express.Router(),
    multer = require('multer'),
    path = require('path'),
    middleware = require('../middleware'),
    storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/images/movies/uploads');
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        },
    }),
    imageFilter = function (req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
            return callback(new Error('Only JPG, jpeg, PNG and GIF image files are allowed!'), false);
        }
        callback(null, true);
    },
    upload = multer({
        storage: storage,
        fileFilter: imageFilter,
    }),
    Movies  = require('../models/movies');
    Cinemas = require('../models/cinemas');
    Liked   = require('../models/liked');
    User    = require('../models/user');

router.get('/', function(req,res){
    Movies.find({show: 'y'}, function(err, allMovies){
        if(err){
            console.log(err);
        } else {  
            Movies.find({show: 'n'}, function(err, comeMovies){
                if(err){
                    console.log(err);
                } else {       
                    res.render('./movies/movies.ejs', {Movies: allMovies, ComeMovie: comeMovies, sort: 'All Movies'});
                }
            });
        }
    });
});

router.get('/new', middleware.checkAdmin, function(req,res){
    res.render('./movies/new.ejs');
});

router.post('/new', upload.single('image'),  function(req, res){
    req.body.movies.image = '/images/movies/uploads/' + req.file.filename;
    Movies.create(req.body.movies, function(err, newMovies){
        if(err){
            console.log(err);
            req.flash('error', 'Please check the information.');
        } else {
            req.flash('success', 'The movie has been added.');
            res.redirect('/movies');
        }
    });
});


router.get('/:id/edit', middleware.checkAdmin,  function(req, res){
    Movies.findById(req.params.id, function( err, foundMovies ){
        if(err) {
            console.log(err);
        } else {
            res.render('./movies/edit.ejs', {Movies: foundMovies})
        }
    });
});

router.put('/:id', upload.single('image'), function(req, res){
    if ( req.file ){
        req.body.movies.image = '/images/movies/uploads/' + req.file.filename;
    }
    Movies.findByIdAndUpdate(req.params.id, req.body.movies, function( err, updatedMovies ){
        if(err) {
            console.log(err);
            req.flash('error', 'Please check the information.');
            res.redirect('/movies/')
        } else {
            req.flash('success', 'The movie has been editted.');
            res.redirect('/movies/' + req.params.id);
        }
    });
});



router.delete('/:id', middleware.checkAdmin, function(req, res){
    Movies.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            req.flash('error', 'An error occurred.');
        } else {
            req.flash('success', 'The cinema has been removed.');
            res.redirect('/movies');
        }
    })
});


router.get('/:id', function(req,res){
    Movies.findById(req.params.id).populate('comments').exec(function(err, foundMovies){
        if(err){
            console.log(err);
        } else {
            Cinemas.find({}, function(err, allCinemas){
                if(err){
                    console.log(err);
                } else {
                    res.render('./movies/show.ejs', {Movies: foundMovies, Cinemas: allCinemas});
                }
            });
        }
    });
});

router.post('/search', function(req,res){
    var name = req.body.search;
    res.redirect('/movies/search/' + name);
});

router.get('/search/:name', function(req,res){
    Movies.find({name: new RegExp(req.params.name, 'i')}, function(err, foundMovies){
        if(err){
            console.log(err);
        } else {
            res.render('./movies/movies.ejs', {Movies: foundMovies, sort: null});
        }
    });
});


router.get('/genre/:genre', function(req, res){
    Movies.find({genre: new RegExp(req.params.genre, 'i'), show: "y"}, function(err, foundMovie){
        if(err){
            console.log(err);
        } else {
            Movies.find({genre: new RegExp(req.params.genre, 'i'), show: 'n'}, function(err, comeMovies){
                if(err){
                    console.log(err);
                } else {       
                    res.render('./movies/movies.ejs', {Movies: foundMovie, ComeMovie: comeMovies, sort: req.params.genre});
                }
            });
        }
    });
});

router.post('/:id/like', middleware.isLoggedIn, function(req, res){
    User.findById(req.user._id, function(err, foundUsers){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            Liked.create({}, function(err, like){
                if(err){
                    console.log(err);
                } else {
                    Movies.findById(req.params.id, function(err, foundMovies){
                        if(err){
                            console.log(err);
                        } else {
                            like.movies.id      = req.params.id;
                            like.movies.name    = foundMovies.name;
                            like.movies.image    = foundMovies.image;
                            like.save();
                            foundUsers.likes.push(like);
                            foundUsers.save();
                            res.redirect('back');
                        }
                    });
                }
            });
        }
    });
});

router.post('/:id/unlike', middleware.isLoggedIn, function(req, res){
    User.update( {_id: req.user._id}, { $pull: { likes: req.params.id } } ).exec(function(err){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            Liked.findByIdAndRemove(req.params.id, function(err){
                if(err){
                    console.log(err);
                } else {
                    res.redirect('back');
                }
            });
        }
    });
});


module.exports = router;