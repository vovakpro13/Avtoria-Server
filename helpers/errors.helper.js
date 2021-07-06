const {
    ErrorHandler,
    errorMessages: {
        ROUTE_NOT_FOUND,
        WRONG_EMAIL_OR_PASSWORD,
        UNAUTHORIZED,
        PERMISSION_DENIED
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

    throwWrongAuthError() {
        throw new ErrorHandler(
            statusCodes.BAD_REQUEST,
            WRONG_EMAIL_OR_PASSWORD.message,
            WRONG_EMAIL_OR_PASSWORD.code
        );
    },

    throwUnauthorized() {
        throw new ErrorHandler(statusCodes.UNAUTHORIZED, UNAUTHORIZED.message, UNAUTHORIZED.code);
    },

    throwPermissionDenied() {
        throw new ErrorHandler(
            statusCodes.BAD_REQUEST,
            PERMISSION_DENIED.message,
            PERMISSION_DENIED.code
        );
    }
};
