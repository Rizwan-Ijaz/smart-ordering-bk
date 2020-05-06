const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.get('/', orderController.getAll);
router.get('/:id', orderController.getById);
router.put('/:id', orderController.update);

module.exports = router;
