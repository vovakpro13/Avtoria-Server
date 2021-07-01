const { statusCodes } = require('../constants');
const { authService } = require('../services');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { body: { password }, user } = req;

            const userData = await authService.login(user, password);

            res.status(statusCodes.OK).json(userData);
        } catch (e) {
            next(e);
        }
    }
};
