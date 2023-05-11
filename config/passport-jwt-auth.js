const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Doctor = require('../models/doctor');
const env = require('../config/environment');

let opts ={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : env.secretKey
};

// passport middleware to authenticate user based on the information stored in jwt 
passport.use(new JWTStrategy(opts, async function(jwtPayLoad, done){

    try {
        let doc = await Doctor.findById(jwtPayLoad._id);
        if(doc){
            return done(null, doc);
        }
        else{
            return done(null, flase);
        }
        
    } catch (error) {
        console.log('Error in finding user from JWT', error);
        return;
    }
}))

module.exports = passport;
