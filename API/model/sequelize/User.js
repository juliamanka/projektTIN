const sequelize = require("../../config/sequelize/sequelize");
const Sequelize = require("sequelize");
const User = sequelize.define('User', {
    userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [5, 15],
                msg: "len_5_15"
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
            notEmpty: {
                msg: "notEmpty"
            },
            len: {
                args: [5, 60],
                msg: "len_5_60"
            },
            isEmail: {
                msg: 'isEmail'
            }
        }
    },
    password: {
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
    role:{
        type: Sequelize.STRING,
        allowNull: false
    }
}
)
module.exports= User;