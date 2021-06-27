const express = require('express');

const { config } = require('./constants');
const { userRouter } = require('./routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.listen(config.PORT, () => {
    console.log(`Server started on port: ${config.PORT}`);
});
