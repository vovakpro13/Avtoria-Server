const express = require('express');

const { config } = require('./constants');
const { userRouter } = require('./routes');
const { ErrorHandler, errorMessages: { ROUTE_NOT_FOUND } } = require('./errors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.get('*', _notFoundHendler);
app.use(_handleErrors);

app.listen(config.PORT, () => {
    console.log(`Server started on port: ${config.PORT}`);
});

// eslint-disable-next-line no-unused-vars
function _handleErrors(err, req, res, next) {
    res
        .status(err.status || 400)
        .json({
            message: err.message || 'Unknown error',
            customCode: err.code || 0
        });
}

function _notFoundHendler(req, res, next) {
    next(new ErrorHandler(404, ROUTE_NOT_FOUND.message, ROUTE_NOT_FOUND.code));
}
