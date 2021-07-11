const { dbModels: { Car } } = require('../database');
const { statusCodes } = require('../constants');
const { carService: { getCars } } = require('../services');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const cars = await getCars();

            res
                .status(statusCodes.OK)
                .json(cars);
        } catch (err) {
            next(err);
        }
    },

    getById: (req, res) => {
        const { record } = req;

        res
            .status(statusCodes.OK)
            .json(record);
    },

    create: async (req, res, next) => {
        try {
            const { body, user: { id: ownerId } } = req;

            const car = await Car.create({ ...body, ownerId });

            res
                .status(statusCodes.CREATED)
                .json(car);
        } catch (err) {
            next(err);
        }
    },

    updateAdStatus: async (req, res, next) => {
        try {
            const { params: { newAdStatus }, record: car } = req;

            car.adStatus = newAdStatus;
            await car.save();

            res
                .status(statusCodes.UPDATED)
                .json(car);
        } catch (err) {
            next(err);
        }
    },

    remove: async (req, res, next) => {
        try {
            const { record: car } = req;

            car.isDeleted = true;
            await car.save();

            res
                .status(statusCodes.DELETED)
                .end();
        } catch (err) {
            next(err);
        }
    },
};
