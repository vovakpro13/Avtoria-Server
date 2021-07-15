const { mySQL: { TABLES: { CARS, USERS }, COLUMNS: { OWNER_ID }, KEYS: { ID } } } = require('../../../constants');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn(CARS, OWNER_ID,
            {
                type: Sequelize.INTEGER,
                references: {
                    model: USERS,
                    key: ID
                },
                allowNull: false
            });

        await queryInterface.bulkUpdate(CARS, { ownerId: 2 }, { id: 1 });
    },

    down: async (queryInterface) => {
        await queryInterface.removeColumn(CARS, OWNER_ID);
    }
};
