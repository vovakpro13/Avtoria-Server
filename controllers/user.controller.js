const { userService } = require('../services');

module.exports = {
    getAllUsers: async (req, res) => {
        const users = await userService.getAll();
        res.json(users);
    },

    getUserById: (req, res) => {
        const { user } = req;
        res.json(user);
    },

    createUser: async (req, res) => {
        const userData = req.body;

        await userService.add(userData);

        res.json(`User ${userData.login} success created!`);
    },

    removeUserById: async (req, res) => {
        const { id } = await req.params;

        await userService.remove(id);

        res.json(`User ${id} success deleted!`);
    },

    updateUserById: async (req, res) => {
        await userService.update(req.body);

        res.json(`User #${req.body.id} success updated !`);
    }
};
