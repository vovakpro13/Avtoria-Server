const { Types, Schema, model } = require('mongoose');

const { dbTablesEnum, carConstants: { adStatus } } = require('../../constants');

const carSchema = new Schema({
    ownerId: {
        type: Types.ObjectId,
        ref: dbTablesEnum.USER,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    race: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    adStatus: {
        type: String,
        enum: Object.values(adStatus),
        default: adStatus.ACTIVE
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: false
    }
}, {
    timestamps: true,
});

carSchema.pre('find', notDeleted);
carSchema.pre('findOne', notDeleted);

function notDeleted() {
    this.where({ isDeleted: false });
}

module.exports = model(dbTablesEnum.CAR, carSchema);
