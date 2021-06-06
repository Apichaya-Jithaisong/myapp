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

router.get('/', function(req,res){
    Movies.find({show: 'y'}, function(err, allMovies){
        if(err){
            console.log(err);
        } else {
            res.render('./movies/movies.ejs', {Movies: allMovies});
        }
    });
});

router.get('/:id', function(req,res){
    Movies.findById(req.params.id).populate('comments').exec(function(err, foundMovies){
        if(err){
            console.log(err);
        } else {
            res.render('./movies/show.ejs', {Movies: foundMovies});
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
            res.render('./movies/movies.ejs', {Movies: foundMovies});
        }
    });
});

router.post('/', function(req,res){
    if ( req.body.genre == 'All-movie' ) {
        res.redirect('back');
        }
    Movies.find({genre: new RegExp(req.body.genre, 'i'), show: 'y'}, function(err, foundMovies){
        if(err){
            console.log(err);
        } else {
            res.render('./movies/movies.ejs', {Movies: foundMovies});
        }
    });
});


//  New
router.get('/new', middleware.isLoggedIn, function(req,res){
    res.render('./movies/new.ejs');
});

router.post('/new', upload.fields([{ name: 'image' }, { name: 'logo' }, { name: 'banner' } ]), function(req, res){
    req.body.movies.image = '/images/movies/uploads/' + req.files['image'][0].filename;
    req.body.movies.logo = '/images/movies/uploads/' + req.files['logo'][0].filename;
    req.body.movies.banner = '/images/movies/uploads/' + req.files['banner'][0].filename;
    Movies.create(req.body.movies, function(err, newMovies){
        if(err){
            console.log(err);
        } else {
            res.redirect('/movies');
        }
    });
});
//  End of New

module.exports = router;