const tokenService = require('./token.service');
const { dbModels: { Token } } = require('../database');

module.exports = {
    createTokens: async (userId) => {
        const tokens = tokenService.generateTokens();

        await Token.deleteMany({ user: userId });
        await Token.create({ user: userId, ...tokens });

        return tokens;
    }
};
