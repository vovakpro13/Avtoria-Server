require('dotenv').config();

const PORT = process.env.PORT || 3000;

module.exports = {
    PORT,
    DB_URL: process.env.DB_URL || 'http://localhost/27017/db',

    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'secret_access_key',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'refresh_access_key',

    MAIL_USER: process.env.MAIL_USER || 'user@gmail.com',
    MAIL_PASS: process.env.MAIL_PASS || '12345',

    AWS_ID: process.env.AWS_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_AVATAR_ACL: 'public-read',

    APP_URL: process.env.APP_URL || 'http://localhost:3000',
    SERVER_URL: process.env.SERVER_URL || `http://localhost:${PORT}`,

    IMAGE_MAX_SIZE: 3 * 1024 * 1024,
    DOCUMENT_MAX_SIZE: 6 * 1024 * 1024,
    VIDEO_MAX_SIZE: 20 * 1024 * 1024,
    AUDIO_MAX_SIZE: 8 * 1024 * 1024,
    MAX_AVATAR_UPLOAD_COUNT: 5,

    STATIC: 'static',

    USER_SECRET_KEYS: [
        'password',
        'activationCode',
        'recoveryCode'
    ],

    MYSQL_USER: process.env.MYSQL_USER,
    MYSQL_PASS: process.env.MYSQL_PASS,
    MYSQL_DB: process.env.MYSQL_DB,
    MYSQL_DIALECT: 'mysql',
    MYSQL_HOST: process.env.MYSQL_HOST || '127.0.0.1',
};
