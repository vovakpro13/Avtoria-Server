const { Router } = require('express');

const { authMiddleWare } = require('../middlewares');
const { authController } = require('../controllers');

const router = new Router();

router.post('/',
    authMiddleWare.chekBodyForLogIn,
    authMiddleWare.isLoginOrEmailExist,
    authController.login);

module.exports = router;
