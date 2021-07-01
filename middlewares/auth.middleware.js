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
