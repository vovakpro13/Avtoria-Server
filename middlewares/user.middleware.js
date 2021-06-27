const { userService } = require('../services');

module.exports = {
    chekUserById: async (req, res, next) => {
        req.user = await userService.getById(req.params.id);
        next();
    },

    chekUserForUpdate: async (req, res, next) => {
        await userService.getById(req.body.id);
        next();
    },

    checkBodyForCreate: (req, res, next) => {
        const requiredKeys = [
            'name',
            'age',
            'login'
        ];
        const bodyKeys = Object.keys(req.body);

        for (const key of requiredKeys) {
            if (!bodyKeys.includes(key)) {
                throw new Error(`Body must also have the key '${key}'`);
            }
        }

        next();
    }
};
