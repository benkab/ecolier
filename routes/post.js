var express     = require('express');
var router      = express.Router();
var User        = require('../models/user');
var Post        = require('../models/post');
var Like        = require('../models/like');
var bcrypt      = require('bcryptjs');
var jwt         = require('jsonwebtoken');

// Retrieve posts
router.get('/', function (req, res, next) {

    Post.find()
        .populate('user')
        .populate('likes')
        .populate('comments')
        .exec(function (err, posts){
            if(err){
                return res.status(500).json({
                    title : 'An error has occured',
                    error : err
                });
            }
            res.status(200).json({
                message : 'Success',
                obj     : posts
            });

        });

});

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

// New post
router.post('/', function (req, res, next) {

    var content     = req.body.content;
    var image       = req.body.image;
    
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

    });



});

// Delete post
router.delete('/:id', function (req, res, next) {
    
    var id     = req.params.id;
    Post.findById(id, function(err, post){

        if(err){
            return res.status(500).json({
                title : 'An error has occured',
                error : err
            });
        }
        if(!post){
            return res.status(500).json({
                title : 'No post found',
                error : err
            });
        }

        post.remove(function (err, result) {
            if(err){
                return res.status(500).json({
                    title : 'An error has occured',
                    error : err
                });
            }
            res.status(201).json({
                message : 'Your post has been deleted!',
                obj     : result
            });
        });
    });
});


module.exports = router;
