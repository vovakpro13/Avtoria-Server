const Joi = require('joi');
const { userRolesEnum, regexp } = require('../../constants');

module.exports = {
    name: Joi.string().min(3).max(200),
    login: Joi.string().min(6).max(250),
    email: Joi.string().regex(regexp.EMAIL),
    role: Joi.string().allow(...Object.values(userRolesEnum)),
    age: Joi.number().min(5).max(150)
};
