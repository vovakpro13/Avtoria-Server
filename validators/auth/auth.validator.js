const Joi = require('joi');
const userKeys = require('../user/userValidKeys');

module.exports = {
    logIn: Joi.object().keys({
        login: userKeys.login,
        email: userKeys.email
            .when('login', { is: null, then: Joi.required() }),
        password: Joi.string().max(200).required()
    })
};
