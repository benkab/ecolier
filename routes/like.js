var express     = require('express');
var router      = express.Router();
var User        = require('../models/user');
var Post        = require('../models/post');
var Like        = require('../models/like');
var bcrypt      = require('bcryptjs');
var jwt         = require('jsonwebtoken');


// Routes protections
router.use('/', function (req, res, next) {
    jwt.verify(req.query.token, 'secret', function (err, decoded) {
        if(err){
            return res.status(401).json({
                title : 'Not authentificated',
                error : err
            });
        }
        next();
    })
});

// New like
router.post('/', function (req, res, next) {

    var content     = req.body.content;
    var image       = req.body.image;
    var created_at  = new Date();

    var decoded     = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user){

        if(err){
            return res.status(500).json({
                title : 'An error has occured',
                error : err
            });
        }

        var post = new Post({
            content         : content,
            image           : image,
            created_at      : created_at,
            user            : user
        });

        post.save(function (err, result) {

            if(err){
                return res.status(500).json({
                    title : 'An error has occured',
                    error : err
                });
            }
            user.posts.push(result);
            user.save();
            res.status(201).json({
                message : 'Your post has been created!',
                obj     : result
            });

        });

        // var like = new Like({
        //     liked : false,
        //     user  : user,
        //     post  : post
        // });

        // like.save(function(err, result){
        //     if(err){
        //         return res.status(500).json({
        //             title : 'An error has occured',
        //             error : err
        //         });
        //     }
        // });

    });



});


module.exports = router;
