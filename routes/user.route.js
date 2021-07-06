const router = require('express').Router();

const { userValidator: { updateUserData, createUser } } = require('../validators');
const { userController } = require('../controllers');
const { userMiddleWare, wareGenerator, authMiddleWare } = require('../middlewares');
const {
    userRolesEnum,
    dynamicParams: {
        PARAM_NAMES, REQUEST_OBJECTS, DB_KEYS
    }
} = require('../constants');

router.get('/', userController.getAllUsers);

router.post('/',
    wareGenerator.chekBodyValid(createUser),
    userMiddleWare.checkUniqueLoginAndEmail,
    userController.createUser);

router.put('/:id', wareGenerator.chekBodyValid(updateUserData));

router.use('/:id', wareGenerator.chekRecordByDynamicParam(PARAM_NAMES.ID, REQUEST_OBJECTS.PARAMS, DB_KEYS.ID));

router.get('/:id', userController.getUserById);

router.use('/:id', authMiddleWare.checkToken());

router.use(userMiddleWare.checkUserRole([
    userRolesEnum.USER,
    userRolesEnum.ADMIN
]));

router.route('/:id')
    .delete(userController.removeUserById)
    .put(userController.updateUserById);

module.exports = router;
