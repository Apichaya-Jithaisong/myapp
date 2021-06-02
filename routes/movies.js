var express = require('express'),
    router  = express.Router(),
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

module.exports = router;