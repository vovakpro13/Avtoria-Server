const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const {
    config:
        {
            ACCESS_TOKEN_SECRET,
            REFRESH_TOKEN_SECRET,
            ACCESS_TOKEN_LIFE_TIME,
            REFRESH_TOKEN_LIFE_TIME,
            ACCESS
        }
} = require('../constants');

const verifyToken = promisify(jwt.verify);

module.exports = {
    generateTokens: () => {
        const accessToken = jwt.sign({}, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_LIFE_TIME });
        const refreshToken = jwt.sign({}, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_LIFE_TIME });

        return {
            accessToken,
            refreshToken
        };
    },

    verifyToken: async (token, type = ACCESS) => {
        const secret = type === 'access' ? ACCESS_TOKEN_SECRET : REFRESH_TOKEN_SECRET;

        await verifyToken(token, secret);
    }
};
