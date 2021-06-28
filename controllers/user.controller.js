const { userService } = require('../services');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getAll();
            res.json(users);
        } catch (err) {
            res.json(err.message);
        }
    },

    getUserById: (req, res) => {
        const { user } = req;
        res.json(user);
    },

    createUser: async (req, res) => {
        const userData = req.body;

        try {
            await userService.add(userData);
            res.json(`User ${userData.login} success created!`);
        } catch (err) {
            res.json(err.message);
        }
    },

    removeUserById: async (req, res) => {
        const { id } = await req.params;

        try {
            await userService.remove(id);
            res.json(`User ${id} success deleted!`);
        } catch (err) {
            res.json(err.message);
        }
    },

    updateUserById: async (req, res) => {
        try {
            await userService.update(req.body);
            res.json(`User #${req.body.id} success updated !`);
        } catch (err) {
            res.json(err.message);
        }
    }
};
