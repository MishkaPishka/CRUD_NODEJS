const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserAuthDataDAO = require('../authentication_data/user_auth_doa')
const keys = require('./keys')
const session = require('express-session')
var sessionStore = session.MemoryStore();
let User = require('../server/users_info_page/users');
const authUtils = require('../server/identify/identification_utils')


const customFields = {
    usernameField: 'email',
    passwordField: 'password'
};


//verify callback
//implement passport verification ->
//done (error, user )
//check that password and user match
const verifyCallback = (email,password,done) => {
    console.log('user verification callback')
    User.findOne({ email: email })
        .then((user) => {

            if (!user) { return done(null, false,{msg:'no such user'}) }

            const isValid = authUtils.validPassword(password, user.hash, user.salt);

            if (isValid) {
                return done(null, user);
            } else {
                return done(null, false,{msg:'invalid password'});
            }
        })
        .catch((err) => {
            console.log('passport-config- verifyCallback- error',err)
            done(err);
        });
};//end callback function


const strategy = new LocalStrategy(customFields,verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((userId, done) => {
    User.findById(userId)
        .then((user) => {
            done(null, user);
        })
        .catch(err => done(err))
});

module.exports.session_properties = {
    // secret: keys.session_secret['secret'],
    // cookie:{
    //     maxAge:1000*60,
    //     secure:true
    // }
    //

        secret: keys.session_secret['secret'],
        resave: false,
        saveUninitialized: true,
        store :  sessionStore,
        cookie: {
            maxAge: 1000 * 60 * 5 // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
        }


}
