const Sequelize = require('sequelize');

const User = require("../../model/sequelize/User");

const authUtils = require("../../utils/authUtils");
const Conservator = require("../../model/sequelize/Conservator");
const ArtConservator = require("../../model/sequelize/ArtConservator");
const Artwork = require("../../model/sequelize/Artwork");

exports.getUsers = () => {
    return User.findAll();
};

exports.getUserById = (userId) => {
    return User.findByPk(userId);
};

exports.createUser = (newUserData) => {
    return User.create({
       username: newUserData.username,
        email: newUserData.email,
        password: authUtils.hashPassword(newUserData.password),
        role: "guest"
    });
};
exports.findByEmail = (email)=>{
    return User.findOne({
        where: {email: email}
    });
}