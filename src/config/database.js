const { Sequelize } = require('sequelize');


module.exports = new Sequelize('trufal', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});