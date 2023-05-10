const Doctor = require('../models/doctor');
const jwt = require('jsonwebtoken');

module.exports.create = async function(req, res){
    try {

        let doc = await Doctor.findOne({email: req.body.email});
        if(doc)
        {
            return res.status(202).json({
                message: 'Email id already exist!',
                data: doc
            })
        }
        else{
            if(req.body.password != req.body.confirmPassword)
            {
                return res.status(422).json({
                    message: "Password and Confirm Password does not match!"
                })
            }
            doc = await Doctor.create(req.body);
            return res.status(200).json({
                message: "User id created, and your password in stored in encrypted format",
                data: doc
            });
        }
        
    } catch (error) {
        console.log('Error creating Doctor account', error);
        return res.status(500).json({
            message: "Interval server error"
        });
    }
}

module.exports.createSession = async function(req, res){
    try {
        let doc = await Doctor.findOne({email: req.body.email});
        if(doc)
        {
            doc.comparePassword(req.body.password, function(err, isMatch){
                if(isMatch)
                {
                    return res.status(200).json({
                        message: "Sign in successful, here is your token, please keep it safe!",
                        data: {
                            token : jwt.sign(doc.toJSON(), 'random' , {expiresIn: '1000000'})
                        }
                    });
                }
                else if(!isMatch)
                {
                    return res.status(422).json({
                        message: "Invalid username or password",
                    });
                }
                else{
                    console.log("Error comparing password", err);
                    return res.status(500).json({
                        message: "Internal server error"
                    });
                }
            })
        }
        else
        {
            return res.status(422).json({
                message: "Invalid username or password"
            });
        }        
    } catch (error) {
        console.log('Error while loging in doctor', error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}