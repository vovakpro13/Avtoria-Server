const { dbModels: { User } } = require('../database');
const { ErrorHandler } = require('../errors');
const { userValidator } = require('../validators');
const { statusCodes } = require('../constants');
const { errorsHelper } = require('../helpers');
const {
    errorMessages: {
        LOGIN_ALREADY_EXIST,
        RECORD_NOT_FOUND,
        EMAIL_ALREADY_EXIST
    }
} = require('../errors');

module.exports = {
    chekUserById: async (req, res, next) => {
        try {
            const user = await User.findById(req.params.id);

            if (!user) {
                throw new ErrorHandler(
                    statusCodes.NOT_FOUND,
                    RECORD_NOT_FOUND.message,
                    RECORD_NOT_FOUND.code
                );
            }

            req.user = user;

            next();
        } catch (err) {
            next(err);
        }
    },

    chekBodyForUpdate: (req, res, next) => {
        try {
            const { error } = userValidator.updateUserData.validate(req.body);

            if (error) {
                errorsHelper.throwNotValidBody(error);
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    checkBodyForCreate: (req, res, next) => {
        try {
            const { error } = userValidator.createUser.validate(req.body);

            if (error) {
                errorsHelper.throwNotValidBody(error);
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    checkUniqueLoginAndEmail: async (req, res, next) => {
        try {
            const { login, email } = req.body;

            const userWithLogin = await User.findOne({ login });

            if (userWithLogin) {
                throw new ErrorHandler(
                    statusCodes.ALREADY_EXIST,
                    LOGIN_ALREADY_EXIST.message,
                    LOGIN_ALREADY_EXIST.code
                );
            }

            const userWithEmail = await User.findOne({ email });

            if (userWithEmail) {
                throw new ErrorHandler(
                    statusCodes.ALREADY_EXIST,
                    EMAIL_ALREADY_EXIST.message,
                    EMAIL_ALREADY_EXIST.code
                );
            }

            next();
        } catch (err) {
            next(err);
        }
    },
};
