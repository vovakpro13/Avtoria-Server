const { Sequelize } = require('sequelize');

module.exports.sequelize = new Sequelize('feb-2021', 'root', 'root', {
    dialect: 'mysql',
    logging: false
});
