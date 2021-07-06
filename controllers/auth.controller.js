const { dbModels: { Token } } = require('../database');
const { statusCodes } = require('../constants');
const { passwordHasher } = require('../helpers');
const { authService } = require('../services');

module.exports = {
    logIn: async (req, res, next) => {
        try {
            const { body: { password }, user } = req;

            await passwordHasher.compare(password, user.password);
            await _sendTokens(user, res);
        } catch (e) {
            next(e);
        }
    },

    logOut: async (req, res, next) => {
        try {
            const { userId } = req;

            await Token.deleteMany({ user: userId });

            res
                .status(statusCodes.DELETED)
                .end();
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            await _sendTokens(req.user, res);
        } catch (e) {
            next(e);
        }
    },
};

async function _sendTokens(user, res) {
    const tokens = await authService.createTokens(user.id);

    res
        .status(statusCodes.OK)
        .json({ ...tokens, user });
}
