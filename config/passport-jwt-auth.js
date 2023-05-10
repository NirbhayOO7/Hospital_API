const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Doctor = require('../models/doctor');

let opts ={
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'random'
};

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
