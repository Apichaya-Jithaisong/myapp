var express = require('express'),
    router  = express.Router(),
    multer = require('multer'),
    path = require('path'),
    middleware = require('../middleware'),
    storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/images/cinemas/uploads');
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
    Cinemas  = require('../models/cinemas');
    Movies  = require('../models/movies');

router.get('/', function(req,res){
    Cinemas.find().sort({score: -1}).exec(function(err, allCinemas){
        if(err){
            console.log(err);
        } else {
            res.render('./cinemas/cinemas.ejs', {Cinemas: allCinemas});
        }
    });
});

router.get('/new', middleware.checkAdmin, function(req,res){
    res.render('./cinemas/new.ejs');
});

router.post('/new', upload.fields([{ name: 'image' }, { name: 'image2' }, { name: 'image3' }, { name: 'image4' }]), function(req, res){
    req.body.cinemas.image = '/images/cinemas/uploads/' + req.files['image'][0].filename;
    req.body.cinemas.image2 = '/images/cinemas/uploads/' + req.files['image2'][0].filename;
    req.body.cinemas.image3 = '/images/cinemas/uploads/' + req.files['image3'][0].filename;
    req.body.cinemas.image4 = '/images/cinemas/uploads/' + req.files['image4'][0].filename;
    Cinemas.create(req.body.cinemas, function(err, newCinemas){
        if(err){
            console.log(err);
            req.flash('error', 'Please check the information.');
        } else {
            req.flash('success', 'The cinema has been added.');
            res.redirect('/cinemas');
        }
    });
});

router.get('/:id', function(req,res){
    Cinemas.findById(req.params.id).exec(function(err, foundCinemas){
        if(err){
            console.log(err);
        } else {
            Movies.find({show: 'y'}, function(err, allMovies){
                if(err){
                    console.log(err);
                } else {
                    res.render('./cinemas/show.ejs', {Cinemas: foundCinemas, Movies: allMovies});
                }
            });
        }
    });
});


router.get('/:id/edit', middleware.checkAdmin,  function(req, res){
    Cinemas.findById(req.params.id, function( err, foundCinemas ){
        if(err) {
            console.log(err);
        } else {
            res.render('./cinemas/edit.ejs', {Cinemas: foundCinemas})
        }
    });
});

router.put('/:id', upload.fields([{ name: 'image' }, { name: 'image2' }, { name: 'image3' }, { name: 'image4' }]), function(req, res){
    if ( req.files['image'] ){
        req.body.cinemas.image = '/images/cinemas/uploads/' + req.files['image'][0].filename;
    }
    if ( req.files['image2'] ){
        req.body.cinemas.image2 = '/images/cinemas/uploads/' + req.files['image2'][0].filename;
    }
    if ( req.files['image3'] ){
        req.body.cinemas.image3 = '/images/cinemas/uploads/' + req.files['image3'][0].filename;
    }
    if ( req.files['image4'] ){
        req.body.cinemas.image4 = '/images/cinemas/uploads/' + req.files['image4'][0].filename;
    }
    Cinemas.findByIdAndUpdate(req.params.id, req.body.cinemas, function( err, updatedMovies ){
        if(err) {
            console.log(err);
            req.flash('error', 'Please check the information.');
            res.redirect('/cinemas/')
        } else {
            req.flash('success', 'The cinema has been editted.');
            res.redirect('/cinemas/' + req.params.id);
        }
    });
});


router.delete('/:id', middleware.checkAdmin, function(req, res){
    Cinemas.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            req.flash('error', 'An error occurred.');
        } else {
            req.flash('success', 'The cinema has been removed.');
            res.redirect('/cinemas');
        }
    })
});


module.exports = router;