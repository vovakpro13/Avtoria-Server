const { dbModels: { Car } } = require('../database');

module.exports = {
    getCars: async (filter) => await Car.find(filter)

};
