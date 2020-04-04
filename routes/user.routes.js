const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/seeding', userController.seeding);
router.post('/', userController.create);
router.put('/:id', userController.update);


module.exports = router;
