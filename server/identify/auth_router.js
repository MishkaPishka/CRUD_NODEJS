var express = require('express');
const { validationResult,body} = require('express-validator');
const passport = require('passport')
var router = express.Router();
let User = require('../users_info_page/users');

const validationRules = require('../../config/validationUtils').validate_register
const validationgErrorHandler = require('../../config/validationUtils').errorHandler
const authUtils = require('../identify/identification_utils')



router.post('/register', validationRules ,validationgErrorHandler, function(req, res) {

    const saltHash =authUtils.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({

        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email:req.body.email,
        hash: hash,
        salt: salt
    });

    newUser.save()
        .then((user) => {
            console.log('registered user:',user);
            res.cookie.user = req.body.email;
            passport.authenticate('local')(req, res, function () {
                return  res.send({signedStatus:true })

            })

        })
        .catch(err => {
            console.log('error in registering user:',err.errmsg);
            try {
                req.logOut();
            }
            finally {
                return res.status(403).send({errors:[{location:'user email',msg:authUtils.errorMessagesMap[err.code]}]})
            }
        })
});



router.get('/', function(req, res) {
    if ( req.isAuthenticated()) {
        res.redirect('/users')
    }
    else {
        res.render('register',{err:null});

    }
});

router.get('/sign_in', function(req, res) {

    res.render('sign_in');
});

router.get('/sign_out', function(req, res) {
    req.logout();
    res.redirect('/');
});




router.post('/sign_in/modal', function(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            info.signedStatus = false;
            return res.json(info);

            // res.render('register',{err:info});
            //  return res.render('sign_in');

        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }

      //      return res.redirect(req.originalUrl)
             res.json({loginStatus:true});
            //  return res.send({status:1});
            //next();
        });
    })(req, res, next);
} )
router.post('/sign_in', function(req, res, next) {
    passport.authenticate('local',function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            info.signedStatus=false;
            return  res.json(info);

           // res.render('register',{err:info});
          //  return res.render('sign_in');

        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }

           return   res.send({signedStatus:true }) // res.json({loginStatus:true});
          //  return res.send({status:1});
            //next();
        });
    })(req, res, next);

});


module.exports = router;

