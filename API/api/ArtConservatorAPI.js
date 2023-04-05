const ArtConservatorRepository = require("../repository/sequelize/ArtConservatorRepository");

exports.get = function(req,res) {
    ArtConservatorRepository.getArtConservators().
    then((cons) =>  {
        res.status(200).json(cons);
    }).catch(err => {
        console.log(err);
    });
};

exports.getArtConservatorById = (req,res) => {
    const consId=req.params.artConsId;
    ArtConservatorRepository.getArtConservatorById(consId).
    then(function(conservator) {
        if(!conservator){
            res.status(404).json({
                message: 'Project with ID: ' + consId + ' not found'
            });
        }else{
            res.status(200).json(conservator);
        }
    });
};

exports.createArtConservator = (req,res,next) =>{
    ArtConservatorRepository.createArtConservator(req.body).
    then(function(newObj) {
        res.status(200).json(newObj);
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.updateArtConservator = (req,res,next) => {
    const consId=req.params.artConsId;
    ArtConservatorRepository.updateArtConservator(consId,req.body).
    then(function(result) {
        res.status(200).json({message: 'Conservator updated! ', cons:result});
    }).catch(function(err) {
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    });
};

exports.deleteArtConservator = (req,res,next) => {
    const consId = req.params.artConsId;
    ArtConservatorRepository.deleteArtConservator(consId).
    then(function(result) {
        res.status(200).json({message: 'Removed project', cons: result});
    }).catch(function(err) {
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    });
};

exports.deleteMany = (req,res,next) => {
    const artConsId = req.body;
    ArtConservatorRepository.deleteManyArtCons(artConsId).
    then(function(result) {
        res.status(200).json({message: 'Removed project', cons: result});
    }).catch(function(err) {
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    });
};