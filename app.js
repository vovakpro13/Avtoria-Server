const express = require('express');

const {
    config,
} = require('./constants');
const { errorsHelper } = require('./helpers');
const { userRouter, authRouter } = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.get('*', errorsHelper.throwRouteNotFound);
app.use(errorsHelper.handleErrors);

app.listen(config.PORT, () => {
    console.log(`Server started on port: ${config.PORT}`);
});
