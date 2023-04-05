const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize')

const Artwork = sequelize.define('Artwork', {

    artId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty:{
                msg:"notEmpty"
            },
            len:{
                args: [2,60],
                msg: "len_2_60"
            }
        }
    },
    price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
        validate: {
            notEmpty:{
                msg: "notEmpty"
            },
            isFloat: {
                msg: "isNumber"
            }
        }
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty:{
                msg:"notEmpty"
            }
        }
    },
    dimensions: {
        type:Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty:{
                msg:"notEmpty"
            },
            is: {
                args: [/([0-9]+)x([0-9])+cm/],
                msg: "isDimensions"
            }
        }
    }
});

module.exports= Artwork;