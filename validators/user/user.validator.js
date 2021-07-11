const Joi = require('joi');

const userKeys = require('./userValidKeys');
const { regexp } = require('../../constants');

module.exports = {
    createUser: Joi.object().keys({
        name: userKeys.name.required(),
        login: userKeys.login.required(),
        email: userKeys.email.required(),
        password: Joi.string().regex(regexp.PASSWORD).max(200).required(),
        role: userKeys.role,
        age: userKeys.age.required()
    }),

    updateUserData: Joi.object().keys(userKeys).min(1),
};
