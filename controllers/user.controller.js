const { dbModels: { User } } = require('../database');
const { statusCodes } = require('../constants');
const { passwordHasher } = require('../helpers');
const { responceMessages } = require('../constants');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const { name, ageG, ageL } = req.query;
            const filter = {};

            if (ageG) {
                filter.age = { $gte: ageG };
            }

            if (ageL) {
                filter.age = { $lte: ageL };
            }

            if (name) {
                filter.name = { $regex: name };
            }

            const users = await User.find(filter);
            res
                .status(statusCodes.OK)
                .json(users);
        } catch (err) {
            next(err);
        }
    },

    getUserById: (req, res) => {
        const { record } = req;
        res.status(statusCodes.OK).json(record);
    },

    createUser: async (req, res, next) => {
        try {
            const user = req.body;

            user.password = await passwordHasher.hash(user.password);

            const createdUser = await User.create(user);
            res
                .status(statusCodes.CREATED)
                .json({ message: responceMessages.SUCCESS_CREATED, createdUser });
        } catch (err) {
            next(err);
        }
    },

    removeUserById: async (req, res, next) => {
        try {
            const { id } = req.params;

            await User.findByIdAndDelete(id);

            res.sendStatus(statusCodes.DELETED);
        } catch (err) {
            next(err);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const { params: { id }, body } = req;

            await User.findByIdAndUpdate(id, body, { runValidators: true, useFindAndModify: false });

            res
                .status(statusCodes.UPDATED)
                .json({ message: responceMessages.SUCCESS_UPDATED });
        } catch (err) {
            next(err);
        }
    }
};
