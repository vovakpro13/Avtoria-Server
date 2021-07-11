const { dbModels: { User } } = require('../database');
const {
    ErrorHandler,
    errorMessages: {
        RECORD_NOT_FOUND,
    }
} = require('../errors');
const { statusCodes } = require('../constants');
const { errorsHelper } = require('../helpers');

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

    chekRequestValid: (requestObject, validator) => (req, res, next) => {
        try {
            const { error } = validator.validate(req[requestObject]);

            if (error) {
                errorsHelper.throwNotValidRequestBody(error.details[0].message);
            }

            next();
        } catch (err) {
            next(err);
        }
    },
};
