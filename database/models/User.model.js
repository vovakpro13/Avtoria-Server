const { Schema, model } = require('mongoose');

const { userRolesEnum, dbTablesEnum } = require('../../constants');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
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
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: Object.values(userRolesEnum),
        default: userRolesEnum.USER
    },
    age: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
});

userSchema
    .virtual('uniqueData')
    .get(function() {
        return `${this.email}:${this.login}`;
    });

module.exports = model(dbTablesEnum.USER, userSchema);
