const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const {
    config:
        {
            ACCESS_TOKEN_SECRET,
            REFRESH_TOKEN_SECRET
        }
} = require('../constants');

const verifyToken = promisify(jwt.verify);

module.exports = {
    generateTokens: () => {
        const accessToken = jwt.sign({}, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: '60d' });

        return {
            accessToken,
            refreshToken
        };
    },

    verifyToken: async (token, type = 'access') => {
        const secret = type === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;

        await verifyToken(token, secret);
    }
};
