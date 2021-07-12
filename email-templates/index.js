const {
    emailActions: {
        WELCOME,
        USER_DATA_UPDATED,
        ACCOUNT_DELETED,
        EMAIL_ACTIVATION,
        PASSWORD_RECOVERY
    }
} = require('../constants');

module.exports = {
    [WELCOME]: {
        template: 'welcome',
        subject: 'Welcome on my website!'
    },
    [USER_DATA_UPDATED]: {
        template: 'updated',
        subject: 'Your data were updated!'
    },
    [ACCOUNT_DELETED]: {
        template: 'deleted',
        subject: 'Your account was deleted!'
    },
    [EMAIL_ACTIVATION]: {
        template: 'activation',
        subject: 'Email activation'
    },
    [EMAIL_ACTIVATION]: {
        template: 'activation',
        subject: 'Email activation'
    },
    [PASSWORD_RECOVERY]: {
        template: 'recovery',
        subject: 'Password recovery'
    },
};
