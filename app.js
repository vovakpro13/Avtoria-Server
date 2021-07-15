const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');

const {
    config: { STATIC, PORT },
} = require('./constants');
const { errorsHelper } = require('./helpers');
const {
    userRouter, authRouter, carRouter, mysqlRouter
} = require('./routes');
const { sequelize } = require('./database/MySQL');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, STATIC)));
app.use(fileUpload({}));

app.use('/users', userRouter);
app.use('/cars', carRouter);
app.use('/auth', authRouter);
app.use('/mysql', mysqlRouter);

app.get('*', errorsHelper.throwRouteNotFound);
app.use(errorsHelper.handleErrors);

(async () => {
    await sequelize.sync();

    app.listen(PORT, () => {
        console.log(`Server started on port: ${PORT}`);
    });
})();
