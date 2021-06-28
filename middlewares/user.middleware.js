const { userService } = require('../services');
const { errors } = require('../constants');

module.exports = {
    chekUserById: async (req, res, next) => {
        try {
            const thisUser = await userService.getById(req.params.id);

            if (!thisUser) {
                throw new Error(errors.NOT_EXIST);
            }

            req.user = thisUser;
            next();
        } catch (err) {
            res.json(err.message);
        }
    },

    chekUserForUpdate: async (req, res, next) => {
        try {
            const thisUser = await userService.getById(req.body.id);

            if (!thisUser) {
                throw new Error(errors.NOT_EXIST);
            }

            next();
        } catch (err) {
            res.json(err.message);
        }
    },

    checkBodyForCreate: (req, res, next) => {
        const requiredKeys = [
            'name',
            'age',
            'login'
        ];
        const bodyKeys = Object.keys(req.body);

        try {
            for (const key of requiredKeys) {
                if (!bodyKeys.includes(key)) {
                    throw new Error(`${errors.NOT_HAVE_KEY} '${key}'`);
                }
            }

            next();
        } catch (err) {
            res.json(err.message);
        }
    },

    isUserAlreadyExist: async (req, res, next) => {
        try {
            const thisUser = await userService.getByLogin(req.body.login);

            if (thisUser) {
                throw new Error(errors.ALREADY_EXIST);
            }

            next();
        } catch (err) {
            res.json(err.message);
        }
    },
};
