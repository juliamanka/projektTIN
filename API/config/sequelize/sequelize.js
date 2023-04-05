const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('tin_example_sequelize', 'root', 'root',{
                                dialect: 'mysql',
                                host: 'localhost'
});

module.exports = sequelize;