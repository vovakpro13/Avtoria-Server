const { dbModels: { User, Avatar } } = require('../database');
const { ErrorHandler } = require('../errors');
const { statusCodes } = require('../constants');
const { errorsHelper } = require('../helpers');
const {
    errorMessages: {
        LOGIN_ALREADY_EXIST,
        EMAIL_ALREADY_EXIST
    }
} = require('../errors');

module.exports = {
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

    checkUserRole: (roles = []) => (req, res, next) => {
        try {
            const { user } = req;

            if (!roles.includes(user.role)) {
                errorsHelper.throwPermissionDenied();
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    checkIsAvatarExist: async (req, res, next) => {
        try {
            const { params: { avatarId } } = req;

            const avatar = await Avatar.findById(avatarId);

            if (!avatar) {
                errorsHelper.throwRecordNotFound();
            }

            req.avatar = avatar;

            next();
        } catch (err) {
            next(err);
        }
    },
};
