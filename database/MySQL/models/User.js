const { Model, DataTypes } = require('sequelize');

const { mySQL: { TABLES: { USERS } } } = require('../../../constants');
const { sequelize } = require('../index');

class User extends Model { }

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        tableName: USERS
    }
);

module.exports = User;
