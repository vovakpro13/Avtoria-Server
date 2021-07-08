require('dotenv').config();

const PORT = process.env.PORT || 3000;

module.exports = {
    PORT,
    DB_URL: process.env.DB_URL || 'http://localhost/27017/db',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'secret_access_key',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refresh_access_key',
    MAIL_USER: process.env.MAIL_USER || 'user@gmail.com',
    MAIL_PASS: process.env.MAIL_PASS || '12345',
    APP_URL: process.env.APP_URL || 'http://localhost:3000',
    SERVER_URL: process.env.SERVER_URL || `http://localhost:${PORT}`,
};
