var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    path = require('path'),
    middleware = require('../middleware'),
    storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/images/user/');
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
    upload = multer({ storage: storage, fileFilter: imageFilter }),
    Reserve     = require('../models/reserve');
    User        = require('../models/user');


// Profile
router.get('/:id', middleware.checkProfileOwner, function (req, res) {
    User.findById(req.params.id).exec(function (err, foundUsers) {
        if (err) {
            console.log(err);
        } else {
            User.findById(req.params.id).populate('likes').exec(function(err, likedMovies){
                if (err) {
                    console.log(err);
                } else {
                    res.render('./user/profile.ejs', { User: foundUsers, Movies: likedMovies });
                }
            });
        }
    });
});

//  Change profile pic
router.post('/:id', middleware.checkProfileOwner, upload.single('image'), function (req, res){
    User.findByIdAndUpdate(req.params.id,
        {
            profileImage: '/images/user/' + req.file.filename
        },
        function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('back');
            }
        });
});
//  End of Change profile pic

router.get('/:id/ticket', middleware.checkProfileOwner, function (req, res) {
    User.findById(req.params.id).exec(function (err, foundUsers) {
        if (err) {
            console.log(err);
        } else {
            Reserve.find({'user.id': req.params.id}).exec(function(err, foundReserve){
                if (err) {
                    console.log(err);
                } else {
                    res.render('./user/ticket.ejs', { User: foundUsers, Reserve: foundReserve });
                }
            });
        }
    });
});

// ------------- END OF Profile ----------------

module.exports = router;