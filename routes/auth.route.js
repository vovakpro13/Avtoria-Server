const { Router } = require('express');

const { authValidator: { logIn } } = require('../validators');
const { authMiddleWare, wareGenerator } = require('../middlewares');
const { authController } = require('../controllers');
const {
    authKeywords: { REFRESH },
    dynamicParams: {
        DB_KEYS: { ACTIVATION_CODE },
        PARAM_NAMES: { LINK },
        REQUEST_OBJECTS
    }
} = require('../constants');

const router = new Router();

router.post('/',
    wareGenerator.chekRequestValid(REQUEST_OBJECTS.BODY, logIn),
    authMiddleWare.isLoginOrEmailExist,
    authController.logIn);

router.post('/logout',
    authMiddleWare.checkToken(),
    authController.logOut);

router.post('/refresh',
    authMiddleWare.checkToken(REFRESH),
    authController.refresh);

router.get('/activate/:link',
    wareGenerator.chekRecordByDynamicParam(LINK, REQUEST_OBJECTS.PARAMS, ACTIVATION_CODE),
    authController.activate);

module.exports = router;
