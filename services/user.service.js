const { dbModels: { User } } = require('../database');
const { passwordHasher } = require('../helpers');

module.exports = {
    create: async (user) => {
        const password = await passwordHasher.hash(user.password);

        const createdUser = await User.create({ ...user, password });

        return createdUser;
    }
};
