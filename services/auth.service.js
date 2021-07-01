const { passwordHasher } = require('../helpers');

module.exports = {
    login: async (user, password) => {
        await passwordHasher.compare(password, user.password);

        user.password = undefined;

        return user;
    }
};
