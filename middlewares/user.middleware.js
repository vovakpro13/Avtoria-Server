const { dbModels: { User } } = require('../database');
const { ErrorHandler } = require('../errors');
const {
    errorMessages: {
        LOGIN_ALREADY_EXIST,
        RECORD_NOT_FOUND,
        BAD_REQUEST_BODY,
        EMAIL_ALREADY_EXIST
    }
} = require('../errors');

module.exports = {
    chekUserById: async (req, res, next) => {
        try {
            req.user = await isUserExist(req.params.id);

            next();
        } catch (err) {
            next(err);
        }
    },

    chekUserForUpdate: async (req, res, next) => {
        try {
            await isUserExist(req.params.id);

            next();
        } catch (err) {
            next(err);
        }
    },

    checkBodyForCreate: (req, res, next) => {
        try {
            const allowedKeys = [
                'name',
                'login',
                'email',
                'age',
                'role'
            ];

            const bodyKeys = Object.keys(req.body);

            for (const key of bodyKeys) {
                if (!allowedKeys.includes(key)) {
                    throw new ErrorHandler(
                        400,
                        BAD_REQUEST_BODY.message,
                        BAD_REQUEST_BODY.code
                    );
                }
            }

            next();
        } catch (err) {
            next(err);
        }
    },

    checkUniqueLoginAndEmail: async (req, res, next) => {
        try {
            const { login, email } = req.body;

            const [userWithLogin] = await User.find({ login });

            if (userWithLogin) {
                throw new ErrorHandler(
                    409,
                    LOGIN_ALREADY_EXIST.message,
                    LOGIN_ALREADY_EXIST.code
                );
            }

            const [userWithEmail] = await User.find({ email });

            if (userWithEmail) {
                throw new ErrorHandler(
                    409,
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

async function isUserExist(id) {
    const user = await User.findById(id);

    if (!user) {
        throw new ErrorHandler(404, RECORD_NOT_FOUND.message, RECORD_NOT_FOUND.code);
    }

    return user;
}
