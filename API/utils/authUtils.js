const bcrypt = require('bcryptjs');
const {log} = require("debug");

const salt=bcrypt.genSaltSync(8);

exports.hashPassword = (passPlain) => {
    const passHashed = bcrypt.hashSync(passPlain,salt);
    return passHashed;
}

exports.comparePasswords = (passPlain, passHashed) => {
    const res=bcrypt.compareSync(passPlain,passHashed);
    return res;
}

exports.permitAuthenticatedUser = (req,res,next) => {
    const loggedUser=req.session.loggedUser;
    if(loggedUser){
        next();
    }else{
        throw new Error('unauthorized access');
    }
}