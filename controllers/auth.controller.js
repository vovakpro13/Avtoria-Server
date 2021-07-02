const { statusCodes } = require('../constants');
const { passwordHasher } = require('../helpers');

module.exports = {
    logIn: async (req, res, next) => {
        try {
            const { body: { password }, user } = req;

            await passwordHasher.compare(password, user.password);

            user.password = undefined;
            res.status(statusCodes.OK).json(user);
        } catch (e) {
            next(e);
        }
    }
};
