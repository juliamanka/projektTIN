const Sequelize = require('sequelize');


const Conservator = require("../../model/sequelize/Conservator");
const ArtConservator = require("../../model/sequelize/ArtConservator");
const Artwork = require("../../model/sequelize/Artwork");

exports.getArtConservators =() => {
    return ArtConservator.findAll({include:[
            {
                model: Conservator,
                as: 'conservator'
            }, {
                model: Artwork,
                as: 'artwork'
            }
        ]});
};

exports.getArtConservatorById = (artConsId) =>{
    return ArtConservator.findByPk(artConsId, {include:[
            {
                model: Conservator,
                as: 'conservator'
            },{
                model: Artwork,
                as: 'artwork'
            }
        ]});
};

exports.createArtConservator =(data) => {
    return ArtConservator.create({

        artId: data.artId,
        comment: data.comment,
        consId: data.consId,
        dateFrom: data.dateFrom,
        dateTo: data.dateTo,
        price: data.price

    });
};

exports.updateArtConservator =(artConsId, data) => {
    return ArtConservator.update(data, {where: {artConsId: artConsId}});
};

exports.deleteArtConservator= (artConsId) => {
    return ArtConservator.destroy({
        where: {artConsId: artConsId}
    });
};

exports.deleteManyArtCons = (artCons) => {
    return ArtConservator.find({artConsId: {[Sequelize.Op.in]: artCons}});
};

