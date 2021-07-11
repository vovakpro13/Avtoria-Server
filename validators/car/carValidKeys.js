const Joi = require('joi');

const {
    carConstants: {
        validData: {
            MODEL_LENGTH, MIN_YEAR, MIN_PRICE, COMMENT_LENGTH
        }
    }
} = require('../../constants');

module.exports = {
    model: Joi.string().min(MODEL_LENGTH.MIN).max(MODEL_LENGTH.MAX),
    year: Joi.number().min(MIN_YEAR).max(new Date().getFullYear()),
    price: Joi.number().min(MIN_PRICE),
    race: Joi.number(),
    comment: Joi.string().min(COMMENT_LENGTH.MIN).max(COMMENT_LENGTH.MAX)
};
