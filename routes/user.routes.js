const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/seeding', userController.seeding);
router.post('/', userController.create);
router.get('/', userController.getAll);
router.put('/:id', userController.update);
router.put('/reset/password', userController.passwordUpdate);
router.delete('/:id', userController.deleteUser);


module.exports = router;
