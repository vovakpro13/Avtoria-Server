const { userService } = require('../services');
const { errors } = require('../constants');

module.exports = {
    chekUserById: async (req, res, next) => {
        try {
            req.user = await isUserExist(req.params.id);
            next();
        } catch (err) {
            res.json(err.message);
        }
    },

    chekUserForUpdate: async (req, res, next) => {
        try {
            await isUserExist(req.body.id);

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

async function isUserExist(id) {
    const user = await userService.getById(id)
    if (!user) {
        throw new Error(errors.NOT_EXIST);
    }

    return user;
}
