const ArtworkRepository = require("../repository/sequelize/ArtworkRepository");

exports.getArtworks = (req,res,next) => {
    ArtworkRepository.getArtworks().
        then(function(arts) {
            res.status(200).json(arts);
    }).catch(function(err) {
        console.log(err);
    });
};

exports.getArtworkById = (req,res,next) => {
    const artId=req.params.artId;
    ArtworkRepository.getArtworkById(artId).
        then(function(artwork) {
            if(!artwork){
                res.status(404).json({
                    message: 'Artwork with ID: ' + artId + ' not found'
                });
            }else{
                res.status(200).json(artwork);
            }
    });
};

exports.createArtwork = (req,res,next) =>{
    ArtworkRepository.createArtwork(req.body).
        then(function(newObj) {
            res.status(200).json(newObj);
    }).catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    });
};

exports.updateArtwork = (req,res,next) => {
    const artId=req.params.artId;
    ArtworkRepository.updateArtwork(artId,req.body).
    then(function(result) {
        res.status(200).json({message: 'Artwork updated! ', arts:result});
    }).catch(function(err) {
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    });
};

exports.deleteArtwork = (req,res,next) => {
    const artId = req.params.artId;
    ArtworkRepository.deleteArtwork(artId).
    then(function(result) {
        res.status(200).json({message: 'Removed artwork', arts: result});
    }).catch(function(err) {
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    });
};