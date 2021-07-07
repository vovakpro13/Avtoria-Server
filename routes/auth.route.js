const { Router } = require('express');

const { config: { REFRESH } } = require('../constants');
const { authValidator: { logIn } } = require('../validators');
const { authMiddleWare, wareGenerator } = require('../middlewares');
const { authController } = require('../controllers');

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

module.exports = router;
