const bcrypt = require('bcrypt');
const { errorsHelper } = require('./errors.helper');

class PasswordHasher {
    // eslint-disable-next-line class-methods-use-this
    async compare(password, hashedPassword) {
        const isEqual = await bcrypt.compare(password, hashedPassword);

        if (!isEqual) {
            errorsHelper.throwWrongAuthError();
        }
    }

    // eslint-disable-next-line class-methods-use-this
    async hash(password) {
        const hashedPassword = await bcrypt.hash(password, 10);

        return hashedPassword;
    }
}

module.exports = new PasswordHasher();
