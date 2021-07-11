const { Types, Schema, model } = require('mongoose');

const { dbTablesEnum } = require('../../constants');

const avatarSchema = new Schema({
    user: {
        type: Types.ObjectId,
        ref: dbTablesEnum.USER,
        required: true
    },
    isMain: {
        type: Boolean,
        default: false
    },
    imageUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model(dbTablesEnum.AVATAR, avatarSchema);
