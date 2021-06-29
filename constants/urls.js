require('dotenv').config();

module.exports = {
    DB: `mongodb+srv://vovlodya:${process.env.DB_PASSWORD}@mongocluster.nlxbe.mongodb.net/mongoCluster?retryWrites=true&w=majority`
};
