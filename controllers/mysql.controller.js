const { statusCodes } = require('../constants');
const { UserModel } = require('../database/MySQL/models');

const { sequelize } = require('../database/MySQL');

module.exports = {
    getStudents: async (req, res, next) => {
        try {
            const users = await UserModel.findAll();

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
        const transaction = await sequelize.transaction();

        try {
            const { body: { name } } = req;

            const { id } = await UserModel.create({ name }, { transaction });

            const updatedUser = await UserModel.update({ name: `${name}____` }, { where: { id }, transaction });

            await transaction.commit();

            res
                .status(statusCodes.CREATED)
                .json({ updatedUser });
        } catch (e) {
            await transaction.rollback();
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
