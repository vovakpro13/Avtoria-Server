const router = require('express').Router();

const { userController } = require('../controllers');
const { userMiddleWare } = require('../middlewares');

router.get('/', userController.getAllUsers);

router.get('/:id',
    userMiddleWare.chekUserById,
    userController.getUserById);

router.post('/',
    userMiddleWare.checkUniqueLoginAndEmail,
    userMiddleWare.checkBodyForCreate,
    userController.createUser);

router.delete('/:id',
    userMiddleWare.chekUserById,
    userController.removeUserById);

router.put('/:id',
    userMiddleWare.chekUserForUpdate,
    userController.updateUserById);

module.exports = router;
