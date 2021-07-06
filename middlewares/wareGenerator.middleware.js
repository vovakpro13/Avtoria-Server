const { dbModels: { User } } = require('../database');
const { ErrorHandler } = require('../errors');
const { statusCodes } = require('../constants');
const {
    errorMessages: {
        RECORD_NOT_FOUND,
    }
} = require('../errors');

module.exports = {
    chekRecordByDynamicParam: (paramName, object = 'body', dbKey = paramName, model = User) => async (req, res, next) => {
        try {
            const value = req[object][paramName];

            const record = await model.findOne({ [dbKey]: value });

            if (!record) {
                throw new ErrorHandler(
                    statusCodes.NOT_FOUND,
                    RECORD_NOT_FOUND.message,
                    RECORD_NOT_FOUND.code
                );
            }

            req.record = record;

            next();
        } catch (err) {
            next(err);
        }
    },

    chekBodyValid: (validator) => (req, res, next) => {
        try {
            const { error } = validator.validate(req.body);

            if (error) {
                throw new ErrorHandler(
                    statusCodes.BAD_REQUEST,
                    error.details[0].message,
                    statusCodes.BAD_REQUEST
                );
            }

            next();
        } catch (err) {
            next(err);
        }
    },
};
