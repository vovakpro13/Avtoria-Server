const { mySQL: { TABLES: { CARS } } } = require('../../../constants');

module.exports = {
    up: async (queryInterface) => {
        await queryInterface.bulkInsert(CARS, [{
            model: 'BMW',
            price: '20000'
        }]);
    },

    down: async (queryInterface,) => {
        await queryInterface.bulkDelete(CARS, { model: 'BMW' });
    }
};
