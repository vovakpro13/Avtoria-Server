const Joi = require('joi');

const userKeys = require('../user/userValidKeys');
const { regexp } = require('../../constants');

module.exports = {
    logIn: Joi.object().keys({
        login: userKeys.login,
        email: userKeys.email
            .when('login', { is: null, then: Joi.required() }),
        password: Joi.string().max(200).required()
    }),

    recoveryBody: Joi.object().keys({
        email: Joi.string().regex(regexp.EMAIL).required(),
        code: Joi.number().max(99999),
        newPassword: Joi.string().regex(regexp.PASSWORD).max(200)
            .when('code', { is: Joi.exist(), then: Joi.required() })
    })
};
