const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');

const {
    config: { STATIC, PORT },
} = require('./constants');
const { errorsHelper } = require('./helpers');
const { userRouter, authRouter, carRouter } = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, STATIC)));
app.use(fileUpload({}));

app.use('/users', userRouter);
app.use('/cars', carRouter);
app.use('/auth', authRouter);

app.get('*', errorsHelper.throwRouteNotFound);
app.use(errorsHelper.handleErrors);

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
