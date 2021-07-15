const { Sequelize } = require('sequelize');

const {
    config: {
        MYSQL_USER,
        MYSQL_PASS,
        MYSQL_DB,
        MYSQL_DIALECT
    }
} = require('../../constants');

module.exports.sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PASS, {
    dialect: MYSQL_DIALECT,
    logging: false
});
