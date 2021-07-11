const router = require('express').Router();

const { userValidator: { updateUserData, createUser } } = require('../validators');
const { userController } = require('../controllers');
const {
    userMiddleWare, wareGenerator, authMiddleWare, fileMiddleware
} = require('../middlewares');
const {
    staticDirNames: { FOLDER_NAME_TYPE_FILE: { IMAGES } },
    dynamicParams: {
        PARAM_NAMES, REQUEST_OBJECTS, DB_KEYS
    },
    config: { MAX_AVATAR_UPLOAD_COUNT }
} = require('../constants');

router.get('/', userController.getAllUsers);

router.post('/',
    wareGenerator.chekRequestValid(REQUEST_OBJECTS.BODY, createUser),
    fileMiddleware.checkFiles,
    fileMiddleware.checkAvatarValid,
    userMiddleWare.checkUniqueLoginAndEmail,
    userController.createUser);

router.put('/:id', wareGenerator.chekRequestValid(REQUEST_OBJECTS.BODY, updateUserData));
router.post('/:id/addAvatars',
    fileMiddleware.checkFiles,
    fileMiddleware.maxFilesCount(IMAGES, MAX_AVATAR_UPLOAD_COUNT));

router.use('/:id', wareGenerator.chekRecordByDynamicParam(PARAM_NAMES.ID, REQUEST_OBJECTS.PARAMS, DB_KEYS.ID));

router.get('/:id', userController.getUserById);
router.get('/:id/cars', userController.getUserCars);

router
    .use('/:id', authMiddleWare.checkToken())
    .post('/:id/addAvatars', userController.addNewAvatars)
    .put('/:id', userController.updateUserById)
    .delete('/:id', userController.removeUserById);

module.exports = router;
