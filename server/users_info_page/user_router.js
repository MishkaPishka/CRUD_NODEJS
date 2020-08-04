var express = require('express');
const {check, validationResult,body,param} = require('express-validator/check');

var router = express.Router();
let user_controller = require('./users_controller')
let user_utils = require('./users_utils')

const authUtils = require('../identify/identification_utils')
const passport = require('passport')

const validationRules = require('../../config/validationUtils').validate_register
const validationgErrorHandler = require('../../config/validationUtils').errorHandler






//TODO
router.post('/update', authUtils.SignedInOrRedirect, function(req, res) {
    console.log('router update details:',req.body.details);
    return res.send("ok");

})
router.get('/', authUtils.SignedInOrRedirect, function(req, res) {
    console.log('my stocks page',req.session,'user:',req.user)
    if (!req.isAuthenticated()) {
        return res.redirect('/auth').send()
    }

    user_controller.get_user_info(req.session.passport.user)
        .then(data=>
        {

            let user_info = data;
            let user_data = {}
            let loggedIn = true;
            res.render('my_stocks',{user_info:user_info,user_data:user_data,logged:loggedIn})
        }
        )





});





const validate_sign_in =  [

    body('email').isEmail().withMessage('Must include valid email'),

    body('password').notEmpty().withMessage('Password field empty'),


    body('email').custom(value => {
        return user_controller.find_user_by_mail(value)
            .then(user => {
                if (user) {
                    throw new Error('User with that mail already exists:'+user);
                }
            })
    })

]


router.get('/logout',function(req, res){

    req.logOut();
});





module.exports = router ;