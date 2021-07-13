const { statusCodes } = require('../constants');
const { UserModel } = require('../database/MySQL/models');

module.exports = {
    getStudents: async (req, res, next) => {
        try {
            const users = await UserModel.findAll();

            // destroy, create, update, findByPk, findOne        type: DataTypes.INEGER,
            //         autoIncrement: true,
            //         primaryKey: true

            res
                .status(statusCodes.OK)
                .json({ users });
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            const { params: { id } } = req;

            const user = await UserModel.findOne({ where: { id } });
            const userByPk = await UserModel.findByPk(id);

            res
                .status(statusCodes.OK)
                .json({ user, userByPk });
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { body } = req;

            const createdUser = await UserModel.create(body);

            res
                .status(statusCodes.CREATED)
                .json({ createdUser });
        } catch (e) {
            next(e);
        }
    },

    removeUser: async (req, res, next) => {
        try {
            const { params: { id } } = req;

            await UserModel.destroy({ where: { id } });

            res
                .status(statusCodes.DELETED)
                .json({ deletedUserId: id });
        } catch (e) {
            next(e);
        }
    },
};
