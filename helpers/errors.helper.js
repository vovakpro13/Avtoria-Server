const {
    ErrorHandler,
    errorMessages: {
        ROUTE_NOT_FOUND
    }
} = require('../errors');
const { statusCodes, errors } = require('../constants');

module.exports = {
    throwRouteNotFound: (req, res, next) => {
        next(new ErrorHandler(404, ROUTE_NOT_FOUND.message, ROUTE_NOT_FOUND.code));
    },

    // eslint-disable-next-line no-unused-vars
    handleErrors(err, req, res, next) {
        res
            .status(err.status || statusCodes.BAD_REQUEST)
            .json({
                message: err.message || errors.UNKNOWN_ERROR,
                customCode: err.code || 0
            });
    },

    throwNotValidBody(error) {
        throw new ErrorHandler(
            statusCodes.BAD_REQUEST,
            error.details[0].message,
            statusCodes.BAD_REQUEST
        );
    }
};
