const { dbModels: { Token } } = require('../database');
const { tokenService } = require('../services');
const {
    authKeywords: {
        AUTHORIZATION, ACCESS_TOKEN, ACCESS, REFRESH_TOKEN
    },
    userRolesEnum: { ADMIN }
} = require('../constants');
const { dbModels: { User } } = require('../database');
const { authValidator } = require('../validators');
const { errorsHelper } = require('../helpers');

module.exports = {
    isLoginOrEmailExist: async (req, res, next) => {
        try {
            const { login, email } = req.body;

            const user = await User
                .findOne({
                    $or: [
                        { login },
                        { email }
                    ]
                })
                .select('+password');

            if (!user) {
                errorsHelper.throwWrongAuthError();
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkToken: (type = 'access') => async (req, res, next) => {
        try {
            const { id } = req.params;

            const token = req.get(AUTHORIZATION);

            if (!token) {
                errorsHelper.throwUnauthorized();
            }

            await tokenService.verifyToken(token, type);

            const foundToken = await Token.findOne({ [type === ACCESS ? ACCESS_TOKEN : REFRESH_TOKEN]: token });

            if (!foundToken) {
                errorsHelper.throwUnauthorized();
            }

            if (id && foundToken.user.id !== id && foundToken.user.role !== ADMIN) {
                errorsHelper.throwPermissionDenied();
            }

            req.user = foundToken.user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
