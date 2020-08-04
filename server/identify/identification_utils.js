const crypto = require('crypto');

module.exports.isSignedIn = (req) =>{
    console.log('is signed in :',req.isAuthenticated());
    return req.isAuthenticated();
}
module.exports.SignedInOrRedirect = (req, res, next) => {
    console.log('in isSignedIn function:',req.session)

    if ( req.isAuthenticated()){
        console.log('isSignedIn function: user authenticated')
        next();
    }
    else {
        console.log('isSignedIn function: user not signed in')

       // return res.redirect('/auth')
           res.status(401);
        if (req.method == 'GET') {
            next();
        } else {
            return res.send('User not signed in');
        }


        // res.paka = false;


    }
}

module.exports.isAdmin = (req,res,next) => {

    if ( req.isAuthenticated() ){
        console.log('user authenticated')
        next();
    }
    else {
        // next();
        //
        //  console.log('user not  authenticated')
            res.status(401).json({msg:'sign in to continue'});

    }
}

module.exports.signOut = (res,req,next) => {

}

//BASED ON - https://github.com/zachgoll/
//generate salt
function * generateSalt ()
    {
        while (true){
            yield  crypto.randomBytes(32).toString('hex');

        }
    }

function genPassword(password) {
    var salt = crypto.randomBytes(32).toString('hex');
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: genHash
    };
}

function validPassword(password, hash, salt) {
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify;
}


let errorMessagesMap = new Map()
errorMessagesMap['11000'] = 'Value exists in system'


module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;
module.exports.errorMessagesMap = errorMessagesMap;