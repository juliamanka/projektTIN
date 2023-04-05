
const UserRepository = require("../repository/sequelize/UserRepository");
const ConservatorRepository = require("../repository/sequelize/ConservatorRepository");


exports.getUserById = (req,res,next) => {
    UserRepository.getUserById(req.params['userId']).
    then(function(conservator) {
        if(!conservator){
            res.status(404).json({
                message: 'Conservator with ID: ' + req.params['userId'] + ' not found'
            })
        }else{
            res.status(200).json(conservator);
        }
    });
};

exports.createUser = (req,res,next) =>{
    UserRepository.createUser(req.body)
        .then(newObj =>  {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};