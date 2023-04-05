const ConservatorRepository = require("../repository/sequelize/ConservatorRepository");
const Conservator = require('../model/sequelize/Conservator');
const bodyParser = require('body-parser');

// exports.getConservators = (res,req,next) => {
//     ConservatorRepository.getConservators().
//         then((cons) =>  {
//         (res.status(200)).json(cons);
//     }).catch(err => {
//         console.log(err);
//     });
// };

exports.getConservators = (req,res,next) => {
        Conservator.findAll().
            then(cons => {
                res.status(200).json(cons);
        }).catch(error => {
            // console.log(error);
        });
    };



exports.getConservatorById = (req,res,next) => {
    ConservatorRepository.getConservatorById(req.params['consId']).
        then(function(conservator) {
            if(!conservator){
                res.status(404).json({
                    message: 'Conservator with ID: ' + req.params['consId'] + ' not found'
                })
            }else{
                res.status(200).json(conservator);
            }
    });
};

exports.createConservator = (req,res,next) =>{
    ConservatorRepository.createConservator(req.body)
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

exports.updateConservator = (req,res,next) => {
    const consId=req.params.consId;
    ConservatorRepository.updateConservator(consId,req.body).
    then(function(result) {
        res.status(200).json({message: 'Conservator updated! ', cons:result});
    }).catch(function(err) {
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    });
};

exports.deleteConservator = (req,res,next) => {
    const consId = req.params.consId;
    ConservatorRepository.deleteConservator(consId).
    then(function(result) {
        res.status(200).json({message: 'Removed conservator', cons: result});
    }).catch(function(err) {
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    });
};