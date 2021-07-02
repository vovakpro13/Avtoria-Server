const { dbModels: { User } } = require('../database');
const { statusCodes } = require('../constants');
const { userService } = require('../services');

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
        const { user } = req;
        res.status(statusCodes.OK).json(user);
    },

    createUser: async (req, res, next) => {
        try {
            const user = await userService.create(req.body);

            res
                .status(statusCodes.CREATED)
                .json({ message: 'User is success created!', user });
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
                .json({ message: 'User is success updated !' });
        } catch (err) {
            next(err);
        }
    }
};
