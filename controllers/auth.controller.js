const { authService: { generateRecoveryCode } } = require('../services');
const { ErrorHandler, errorMessages: { NOT_CORRECT_RECOVERY_CODE, USER_HAS_NOT_RECOVERY_CODE } } = require('../errors');
const { authService, tokenService } = require('../services');
const { dbModels: { User } } = require('../database');
const { passwordHasher } = require('../helpers');
const {
    statusCodes,
    frontendEndpoints: { PROFILE },
    authKeywords: { CREATE_TOKENS, REWRITE_TOKENS, RECOVERY_CODE },
    responceMessages: { RECOVERY_CODE_CREATED }
} = require('../constants');

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

    recovery: async (req, res, next) => {
        try {
            const { record: user, body: { code, newPassword } } = req;

            if (!code) {
                await generateRecoveryCode(user);

                res.json({ message: RECOVERY_CODE_CREATED });
                return;
            }

            const userWithRecoveryCode = await User.findById(user.id).select(RECOVERY_CODE);

            if (userWithRecoveryCode.recoveryCode === 0) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    USER_HAS_NOT_RECOVERY_CODE.message,
                    USER_HAS_NOT_RECOVERY_CODE.code
                );
            }

            if (code !== userWithRecoveryCode.recoveryCode) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    NOT_CORRECT_RECOVERY_CODE.message,
                    NOT_CORRECT_RECOVERY_CODE.code
                );
            }

            userWithRecoveryCode.password = await passwordHasher.hash(newPassword);
            userWithRecoveryCode.recoveryCode = 0;

            await userWithRecoveryCode.save();

            res.status(statusCodes.UPDATED).end();
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
