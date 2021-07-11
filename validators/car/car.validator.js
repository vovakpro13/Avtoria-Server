const Joi = require('joi');

const { carConstants: { adStatus } } = require('../../constants');
const validKeys = require('./carValidKeys');

module.exports = {
    createBody: Joi.object().keys(
        Object
            .entries(validKeys)
            .reduce((acc, cur) => {
                acc[cur[0]] = cur[1].required();
                return acc;
            }, {})
    ),

    updateBody: Joi.object().keys(validKeys),

    newStatus: Joi.object().keys({
        id: Joi.string().required(),
        newAdStatus: Joi.string().valid(...Object.values(adStatus)).required()
    })
};
