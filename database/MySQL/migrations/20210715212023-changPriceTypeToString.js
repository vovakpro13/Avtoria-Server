const { mySQL: { TABLES: { CARS }, COLUMNS: { PRICE } } } = require('../../../constants');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn(CARS, PRICE, Sequelize.STRING);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.changeColumn(CARS, PRICE, Sequelize.INTEGER);
    }
};
