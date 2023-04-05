const Sequelize = require('sequelize');


const Conservator = require("../../model/sequelize/Conservator");
const ArtConservator = require("../../model/sequelize/ArtConservator");
const Artwork = require("../../model/sequelize/Artwork");

exports.getArtworks =() => {
    return Artwork.findAll();
}

exports.getArtworkById = (artId) => {
    return Artwork.findByPk(artId, {
        include: [{
            model: ArtConservator,
            as: 'artConservators',
            include: [{
                    model: Conservator,
                    as: 'conservator'}]
        }]
    });
};

exports.createArtwork = (newArtData) => {
    return Artwork.create({
        title: newArtData.title,
        price: newArtData.price,
        type: newArtData.type,
        dimensions: newArtData.dimensions
    });
};

exports.updateArtwork = (artId, artData) => {
    const title = artData.title;
    const price = artData.price;
    const type=artData.type;
    const dimensions=artData.dimensions;
    return Artwork.update(artData, {where: {artId: artId }});
};

exports.deleteArtwork =(artId) => {
    return Artwork.destroy({
            where: {artId: artId}
        });
};