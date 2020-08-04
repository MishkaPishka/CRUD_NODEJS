const {check, validationResult,body,param} = require('express-validator/check');

const validate_register =  [

    body('email').isEmail().withMessage('Must include valid email'),
    body('first_name').isString().withMessage('Must include valid number'),
    body('last_name').notEmpty().withMessage('Must include valid last name'),
    body('password').notEmpty().withMessage('Password field empty'),
    body('password_confirmation').notEmpty().withMessage('Password field empty2'),
    body('password') .custom((value, { req }) => value == req.body.password_confirmation)



]
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


function errorHandler(req,res,next) {
    console.log('registration error')
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(412).json({ errors: errors.array() });
    }
    next();
}




module.exports.validate_register = validate_register
module.exports.validate_sign_in = validate_sign_in



module.exports.errorHandler = errorHandler