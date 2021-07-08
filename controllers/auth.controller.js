const { statusCodes, frontendEndpoints: { PROFILE }, authKeywords: { CREATE_TOKENS, REWRITE_TOKENS } } = require('../constants');
const { passwordHasher } = require('../helpers');
const { authService, tokenService } = require('../services');

module.exports = {
    logIn: async (req, res, next) => {
        try {
            const { body: { password }, user } = req;

            await passwordHasher.compare(password, user.password);

            await _sendTokens(res, user, CREATE_TOKENS);
        } catch (e) {
            next(e);
        }
    },

    logOut: async (req, res, next) => {
        try {
            const { user: { id } } = req;

            await tokenService.deleteAllTokensForUser(id);

            res
                .status(statusCodes.DELETED)
                .end();
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            await _sendTokens(res, req.user, REWRITE_TOKENS);
        } catch (e) {
            next(e);
        }
    },

    activate: async (req, res, next) => {
        try {
            const { record: user } = req;

            user.isActivated = true;

            await user.save();

            res.redirect(PROFILE);
        } catch (e) {
            next(e);
        }
    },
};

async function _sendTokens(res, user, method) {
    const tokens = await authService[method](user.id);

    res
        .status(statusCodes.OK)
        .json({ ...tokens, user });
}
