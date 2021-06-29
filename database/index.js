const mongoose = require('mongoose');
const { urls } = require('../constants');

mongoose.connect(
    urls.DB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
);

module.exports.dbModels = require('./models');
