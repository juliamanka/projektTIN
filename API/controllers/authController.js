const ConsRepository= require("../repository/sequelize/ConservatorRepository");
const authUtil = require('../utils/authUtils');

exports.login = (req,res,next) => {
    const email=req.body.email;
    const password=req.body.password;
    ConsRepository.findByEmail(email).then(cons=>{
        if(!cons){
            res.render('index',{
                navLocation:'',
                loginError:"Nieprawidłowy adres email lub hasło"
            })
        }else if(authUtil.comparePasswords(password, cons.password)===true){
            req.session.loggedUser = cons;
            res.redirect('/');
        }else{
            res.render('index',{
                navLocation:'',
                loginError: "Nieprawidłowy adres email lub hasło"
            })
        }
    }).catch(err=>{
        console.log(err);
    })
}

exports.logout = (req,res,next) => { //usuwa dane użytkownika z sesji
    req.session.loggedUser = undefined;
    res.redirect('/');
}