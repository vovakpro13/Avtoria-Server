const { emailActions: { PASSWORD_RECOVERY } } = require('../constants');
const mailService = require('./mail.service');
const { generateTokens } = require('./token.service');
const { dbModels: { Token } } = require('../database');
const { authKeywords: { CREATE_TOKENS, REWRITE_TOKENS } } = require('../constants');

module.exports = {
    [CREATE_TOKENS]: async (userId) => {
        const tokens = generateTokens();

        await Token.create({ ...tokens, user: userId });

        return tokens;
    },
    [REWRITE_TOKENS]: async (userId) => {
        const tokens = generateTokens();

        await Token.updateOne({ user: userId }, { ...tokens });

        return tokens;
    },
    generateRecoveryCode: async (user) => {
        const { email, name } = user;
        const recoveryCode = Math.floor(Math.random() * 100000);

        user.recoveryCode = recoveryCode;

        await user.save();
        await mailService.sendMessage(email, PASSWORD_RECOVERY, { name, code: recoveryCode });
    }
};
