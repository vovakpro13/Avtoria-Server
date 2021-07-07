require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL || 'http://localhost/27017/db',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'secret_access_key',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refresh_access_key',
    AUTHORIZATION: 'Authorization',
    ACCESS_TOKEN_LIFE_TIME: '15m',
    REFRESH_TOKEN_LIFE_TIME: '60d',
    REFRESH: 'refresh',
    ACCESS: 'access',
    ACCESS_TOKEN: 'accessToken',
    REFRESH_TOKEN: 'refreshToken'
};
