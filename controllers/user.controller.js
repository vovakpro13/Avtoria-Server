const { v4: uuidv4 } = require('uuid');

const { mailService: { sendMessage }, tokenService: { deleteAllTokensForUser } } = require('../services');
const { dbModels: { User } } = require('../database');
const {
    statusCodes, emailActions: {
        WELCOME, USER_DATA_UPDATED, ACCOUNT_DELETED, EMAIL_ACTIVATION
    }
} = require('../constants');
const { passwordHasher } = require('../helpers');
const {
    responceMessages, frontendEndpoints: { REGISTRATION }, serverEndpoints: { ACTIVATION }
} = require('../constants');

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

            const password = await passwordHasher.hash(user.password);
            const activationCode = uuidv4();

            const createdUser = await User.create({ ...user, password, activationCode });

            const { name, email } = createdUser;

            await sendMessage(email, WELCOME, { name });
            await sendMessage(email, EMAIL_ACTIVATION, { name, activationLink: `${ACTIVATION}/${activationCode}` });

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

            const { email, name } = await User.findByIdAndDelete(id);

            await sendMessage(email, ACCOUNT_DELETED, { name, registerLink: REGISTRATION });
            await deleteAllTokensForUser(id);

            res.sendStatus(statusCodes.DELETED);
        } catch (err) {
            next(err);
        }
    },

    updateUserById: async (req, res, next) => {
        try {
            const { params: { id }, body } = req;

            const { email } = await User.findByIdAndUpdate(id, body, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            });

            await sendMessage(email, USER_DATA_UPDATED, { updatedData: Object.entries(body) });

            res
                .status(statusCodes.UPDATED)
                .json({ message: responceMessages.SUCCESS_UPDATED });
        } catch (err) {
            next(err);
        }
    }
};
