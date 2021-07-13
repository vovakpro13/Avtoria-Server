const router = require('express').Router();

const { mysqlController } = require('../controllers');

router.get('/', mysqlController.getStudents);
router.get('/:id', mysqlController.getById);
router.post('/', mysqlController.createUser);
router.delete('/:id', mysqlController.removeUser);

module.exports = router;
