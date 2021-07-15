const { mySQL: { TABLES: { CARS } } } = require('../../../constants');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable(CARS, {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            model: {
                type: Sequelize.DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 2000
            }
        });
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable(CARS);
    }
};
