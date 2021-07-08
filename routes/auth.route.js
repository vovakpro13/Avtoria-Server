const { Router } = require('express');

const { authValidator: { logIn } } = require('../validators');
const { authMiddleWare, wareGenerator } = require('../middlewares');
const { authController } = require('../controllers');
const {
    authKeywords: { REFRESH },
    dynamicParams: {
        DB_KEYS: { ACTIVATION_CODE },
        PARAM_NAMES: { LINK },
        REQUEST_OBJECTS: { PARAMS }
    }
} = require('../constants');

const router = new Router();

router.post('/',
    wareGenerator.chekBodyValid(logIn),
    authMiddleWare.isLoginOrEmailExist,
    authController.logIn);

router.post('/logout',
    authMiddleWare.checkToken(),
    authController.logOut);

router.post('/refresh',
    authMiddleWare.checkToken(REFRESH),
    authController.refresh);

router.get('/activate/:link',
    wareGenerator.chekRecordByDynamicParam(LINK, PARAMS, ACTIVATION_CODE),
    authController.activate);

module.exports = router;
