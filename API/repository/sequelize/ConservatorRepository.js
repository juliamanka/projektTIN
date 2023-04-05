const Sequelize = require('sequelize');

const Conservator = require("../../model/sequelize/Conservator");
const ArtConservator = require("../../model/sequelize/ArtConservator");
const Artwork = require("../../model/sequelize/Artwork");
const User = require("../../model/sequelize/User");
const {hashPassword} = require("../../utils/authUtils");
const authUtils = require("../../utils/authUtils");

exports.getConservators = () => {
    return Conservator.findAll();
};

exports.getConservatorById = (consId) => {
    return Conservator.findByPk(consId, {
        include: [{
            model: ArtConservator,
            as: 'artConservators',
            include: [{
                    model: Artwork,
                    as: 'artwork'}]
        }]
    });
};

exports.createConservator = (newConsData) => {
    var roleX;
    const regex = /([a-z])+@admin\.[a-z]+/
    if((newConsData.email).match(regex)){
        roleX='admin';
    }else{
        roleX='user'
    }
    return Conservator.create({
        firstName: newConsData.firstName,
        lastName: newConsData.lastName,
        date: newConsData.date,
        email: newConsData.email,
        password: authUtils.hashPassword(newConsData.password),
        role: roleX
    });
};

exports.updateConservator = (consId, consData) => {
    const firstName = consData.firstName;
    const lastName = consData.lastName;
    const date=consData.date;
    const email=consData.email;
    const password=consData.password;
    return Conservator.update(consData, {where: {consId: consId }});
};

exports.deleteConservator =(consId) => {
    return Conservator.destroy({
            where: {consId: consId}
        });
};

exports.findByEmail = (email)=>{
    return Conservator.findOne({
        where: {email: email}
    });
        // || User.findOne({
        // where: {email: email}})
}