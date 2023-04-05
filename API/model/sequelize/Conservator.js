const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize')


const Conservator = sequelize.define('Conservator', {
    consId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    firstName: {
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
    lastName: {
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
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            isDate: {
                msg: "Pole powinno zawierać datę"
            }
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'Podany adres email jest już używany '
        },
        validate: {
            notEmpty:{
                msg: "notEmpty"
            },
            len: {
                args: [5,60],
                msg: "len_5_60"
            },
            isEmail: {
                msg: 'isEmail'
            }
        }
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "isEmpty"
            },
            len: {
                args: [5, 60],
                msg: "len_5_60"
            }
        }
    },
    role: {
        type: Sequelize.STRING
    }
});

module.exports= Conservator;