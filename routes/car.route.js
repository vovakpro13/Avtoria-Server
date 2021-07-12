const router = require('express').Router();

const { dbModels: { Car } } = require('../database');
const { carValidator: { createBody, newStatus } } = require('../validators');
const { carController } = require('../controllers');
const { wareGenerator: { chekRecordByDynamicParam, chekRequestValid }, authMiddleWare } = require('../middlewares');
const {
    dynamicParams: {
        PARAM_NAMES, REQUEST_OBJECTS, DB_KEYS
    }
} = require('../constants');

router
    .use('/:id', chekRecordByDynamicParam(PARAM_NAMES.ID, REQUEST_OBJECTS.PARAMS, DB_KEYS.ID, Car))
    .get('/', carController.getAll)
    .get('/:id', carController.getById);

router
    .post('/', chekRequestValid(REQUEST_OBJECTS.BODY, createBody))
    .patch('/:id/:newAdStatus', chekRequestValid(REQUEST_OBJECTS.PARAMS, newStatus));

router
    .use(authMiddleWare.checkToken())
    .post('/', carController.create)
    .patch('/:id/:newAdStatus', carController.updateAdStatus)
    .delete('/:id', carController.remove);

module.exports = router;
