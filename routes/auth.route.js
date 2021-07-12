const { Router } = require('express');

const { authValidator: { logIn, recoveryBody } } = require('../validators');
const { authMiddleWare, wareGenerator } = require('../middlewares');
const { authController } = require('../controllers');
const {
    authKeywords: { REFRESH },
    dynamicParams: {
        DB_KEYS: { ACTIVATION_CODE },
        PARAM_NAMES: { LINK, EMAIL },
        REQUEST_OBJECTS
    }
} = require('../constants');

const router = new Router();

router.get('/activate/:link',
    wareGenerator.chekRecordByDynamicParam(LINK, REQUEST_OBJECTS.PARAMS, ACTIVATION_CODE),
    authController.activate);

router.post('/recovery',
    wareGenerator.chekRequestValid(REQUEST_OBJECTS.BODY, recoveryBody),
    wareGenerator.chekRecordByDynamicParam(EMAIL, REQUEST_OBJECTS.BODY),
    authController.recovery);

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

module.exports = router;
