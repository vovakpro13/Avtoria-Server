const { config: { USER_SECRET_KEYS } } = require('../constants');

module.exports = {
    userNormalize: (userObject = {}) => {
        for (const key of USER_SECRET_KEYS) {
            userObject[key] = undefined;
        }
    }
};
