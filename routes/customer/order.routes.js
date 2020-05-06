const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/customer/order.controller');

router.post('/', orderController.create);
router.get('/', orderController.get);

module.exports = router;
