const { Schema, model } = require('mongoose');

const { userRolesEnum, dbTablesEnum } = require('../../constants');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: userRolesEnum.USER
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: Object.values(userRolesEnum),
        required: true,
        default: userRolesEnum.USER
    },
    age: {
        type: Number,
        max: 150,
        min: 10,
        required: false,
        default: 18
    }
}, { timestamps: true });

module.exports = model(dbTablesEnum.USER, userSchema);
