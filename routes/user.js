var express     = require('express');
var router      = express.Router();
var User        = require('../models/user');
var Post        = require('../models/post');
var Like        = require('../models/like');
var bcrypt      = require('bcryptjs');
var jwt         = require('jsonwebtoken');


// Get user profile
router.get('/profile/:firstname/:lastname', function (req, res, next) {

    var firstname = req.params.firstname;
    var lastname = req.params.lastname;


    User.find()
        .populate('posts')
        .or([{"firstname": {$regex : firstname}}, {"lastname": {$regex : lastname}}])
        .exec(function(err, user){
        if(err){
            return res.status(500).json({
                title : 'An error has occured while retrieving the user',
                error : err
            });
        }
        if(!user){
            return res.status(500).json({
                title : 'Something went wrong',
                error : {message : 'Ops! bad way!'}
            });
        }
        res.status(200).json({
            message : 'The Auth',
            obj     : user
        });

    });

});

// Retrieve all users
router.get('/search/:term', function (req, res, next) {

    var term = new RegExp(req.params.term, 'i');

    User.find()
        .or([{"firstname": {$regex : term}}, {"lastname": {$regex : term}}, {"position": {$regex : term}}])
        .exec(function (err, users){
            if(err){
                return res.status(500).json({
                    title : 'An error has occured',
                    error : err
                });
            }
            res.status(200).json({
                message : 'Success',
                obj     : users
            });
        });


});

// New user
router.post('/', function (req, res, next) {

    var firstname   = req.body.firstname;
    var lastname    = req.body.lastname;
    var email       = req.body.email;
    var password    = req.body.password;
    var position    = req.body.position;    

    var user = new User({
        firstname   : firstname,
        lastname    : lastname,
        email       : email,
        password    : bcrypt.hashSync(password, 10),
        position    : position,
        actived     : true        
    });

    user.save(function (err, result) {
        if(err){
            return res.status(500).json({
                title : 'An error has occured while adding an user',
                error : err
            });
        }
        res.status(201).json({
            message : 'Your account has been created!',
            obj     : result
        });
    });

});

// Sign in
router.post('/signin', function (req, res, next) {

    var email       = req.body.email;
    var password    = req.body.password;  

    User.findOne({email: email}, function(err, user){
        if(err){
            return res.status(500).json({
                title : 'An error has occured',
                error : err
            });
        }
        if(!user){
            return res.status(500).json({
                title : 'Login failed',
                error : {message : 'Invalid credentials'}
            });
        }
        if(!bcrypt.compareSync(password, user.password)){
            return res.status(500).json({
                title : 'Login failed',
                error : {message : 'Invalid credentials'}
            });
        }
        var token = jwt.sign({user: user}, 'secret', { expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in',
            token : token,
            userId : user._id
        });

    });
    
});

// // Retrieve user
// router.get('/:id', function (req, res, next) {
//
//     var id = req.params.id;
//
//     User.findById(id, function(err, user){
//         if(err){
//             return res.status(500).json({
//                 title : 'An error has occured while retrieving the user',
//                 error : err
//             });
//         }
//         if(!user){
//             return res.status(500).json({
//                 title : 'Something went wrong',
//                 error : {message : 'Ops! bad way!'}
//             });
//         }
//         res.status(200).json({
//             message : 'The Auth',
//             obj     : user
//         });
//     });
//
// });


module.exports = router;
