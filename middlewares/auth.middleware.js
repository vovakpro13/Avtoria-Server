const { statusCodes } = require('../constants');
const { ErrorHandler, errorMessages: { WRONG_EMAIL_OR_PASSWORD } } = require('../errors');
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
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    WRONG_EMAIL_OR_PASSWORD.message,
                    WRONG_EMAIL_OR_PASSWORD.code
                );
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },
    chekBodyForLogIn: (req, res, next) => {
        try {
            const { error } = authValidator.logIn.validate(req.body);

            if (error) {
                errorsHelper.throwNotValidBody(error);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
