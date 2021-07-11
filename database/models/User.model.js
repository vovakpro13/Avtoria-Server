const { Types, Schema, model } = require('mongoose');

const { userRolesEnum, dbTablesEnum } = require('../../constants');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    avatars: [{
        type: Types.ObjectId,
        ref: dbTablesEnum.AVATAR
    }],
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
    },
    isActivated: {
        type: Boolean,
        default: false,
    },
    activationCode: {
        type: String,
        select: false,
        required: true
    }
}, {
    timestamps: true,
});

userSchema.pre('find', _populateAvatars);
userSchema.pre('findOne', _populateAvatars);

function _populateAvatars() {
    this.populate('avatars');
}

module.exports = model(dbTablesEnum.USER, userSchema);
