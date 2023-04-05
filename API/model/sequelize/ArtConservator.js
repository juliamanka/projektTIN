const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize')

const ArtConservator = sequelize.define('ArtConservator', {
    artConsId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    consId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            }
        }
    },
    artId: {
        type:Sequelize.INTEGER,
        allowNull:false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
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
    dateFrom: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            isDate: {
                msg: "isDate"
            }
        }
    },
    dateTo: {
        type: Sequelize.DATEONLY,
        allowNull: true,
    },
    comment: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty:{
                msg:"notEmpty"
            },
            len:{
                args: [10,150],
                msg: "len_10_150"
            }
        }
    }
});

module.exports= ArtConservator;