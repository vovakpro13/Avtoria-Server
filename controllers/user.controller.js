const { v4: uuidv4 } = require('uuid');

const {
    mailService: { sendMessage },
    tokenService: { deleteAllTokensForUser },
    carService: { getCars },
    userService: { pushNewAvatar }
} = require('../services');
const {
    statusCodes,
    responceMessages,
    emailActions: {
        WELCOME,
        USER_DATA_UPDATED,
        ACCOUNT_DELETED,
        EMAIL_ACTIVATION
    },
    frontendEndpoints: { REGISTRATION },
    serverEndpoints: { ACTIVATION }
} = require('../constants');
const {
    passwordHasher,
    dataNormalizators: { userNormalize }
} = require('../helpers');
const { dbModels: { User, Avatar } } = require('../database');

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
        const { record: user } = req;

        res
            .status(statusCodes.OK)
            .json(user);
    },

    getUserCars: async (req, res) => {
        const { record: user } = req;

        const cars = await getCars({ ownerId: user.id });

        res
            .status(statusCodes.OK)
            .json(cars);
    },

    createUser: async (req, res, next) => {
        try {
            const { body: user, avatar } = req;

            const password = await passwordHasher.hash(user.password);
            const activationCode = uuidv4();

            const createdUser = await User.create({ ...user, password, activationCode });

            const { id, name, email } = createdUser;

            await sendMessage(email, WELCOME, { name });
            await sendMessage(email, EMAIL_ACTIVATION, { name, activationLink: `${ACTIVATION}/${activationCode}` });

            if (avatar) {
                const { avatarId } = await pushNewAvatar(id, avatar);

                createdUser.avatars = [avatarId];
                await createdUser.save();
            }

            userNormalize(createdUser);

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
    },

    addNewAvatars: async (req, res, next) => {
        try {
            const { images, params: { id } } = req;
            const avatarsId = [];

            for (const avatar of images) {
                // eslint-disable-next-line no-await-in-loop
                const { avatarId } = await pushNewAvatar(id, avatar);

                avatarsId.push(avatarId);
            }

            await User.findByIdAndUpdate(id, { $push: { avatars: { $each: [...avatarsId] } } });

            res
                .status(statusCodes.UPDATED)
                .json({ message: responceMessages.SUCCESS_UPDATED });
        } catch (err) {
            next(err);
        }
    },

    removeAvatarById: async (req, res, next) => {
        try {
            const { params: { id: userId, avatarId } } = req;

            await Avatar.deleteOne({ _id: avatarId });
            await User.findByIdAndUpdate(userId, { $pull: { avatars: { _id: avatarId } } });

            res
                .status(statusCodes.DELETED).end();
        } catch (err) {
            next(err);
        }
    },
};
