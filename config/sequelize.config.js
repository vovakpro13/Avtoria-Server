const {
    config: {
        MYSQL_USER,
        MYSQL_PASS,
        MYSQL_DB,
        MYSQL_HOST,
        MYSQL_DIALECT,
    }
} = require('../constants');

module.exports = {
    development: {
        username: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_DB,
        host: MYSQL_HOST,
        dialect: MYSQL_DIALECT
    }
};
