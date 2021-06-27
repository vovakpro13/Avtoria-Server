const fs = require('fs');
const util = require('util');

const { urls } = require('../constants');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

module.exports = {
    getAll: getAllUsers,

    getById: async (id) => {
        const users = await getAllUsers();
        const thisUser = users.find((user) => user.id === +id);

        if (!thisUser) {
            throw new Error(`User with id #${id} does not exist!`);
        }

        return thisUser;
    },

    add: async ({ age, ...user }) => {
        const users = await getAllUsers();

        user.age = +age;
        users.push({ ...user, id: Date.now() });

        await writeToDB(users);
    },
    remove: async (id) => {
        let users = await getAllUsers();

        users = users.filter((user) => user.id !== +id);

        await writeToDB(users);
    },
    update: async ({ id, ...newData }) => {
        const users = await getAllUsers();
        const keys = Object.keys(newData);

        const thisUser = users.find((user) => user.id === +id);

        for (const key of keys) {
            thisUser[key] = newData[key];
        }

        await writeToDB(users);
    }
};

async function getAllUsers() {
    const data = await readFile(urls.DB);

    if (!data) {
        throw new Error(`Can't read ${urls.DB} !`);
    }
    return JSON.parse(data);
}

async function writeToDB(data) {
    const err = await writeFile(urls.DB, JSON.stringify(data));

    if (err) {
        throw new Error(err);
    }
}
