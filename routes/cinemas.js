var express = require('express'),
    router  = express.Router(),
    Cinemas  = require('../models/cinemas');

    router.get('/', function(req,res){
        Cinemas.find().sort({score: -1}).exec(function(err, allCinemas){
            if(err){
                console.log(err);
            } else {
                res.render('./cinemas/cinemas.ejs', {Cinemas: allCinemas});
            }
        });
    });

// router.get('/:id', function(req,res){
//     Movies.findById(req.params.id).populate('comments').exec(function(err, foundMovies){
//         if(err){
//             console.log(err);
//         } else {
//             res.render('./movies/show.ejs', {Movies: foundMovies});
//         }
//     });
// });

module.exports = router;