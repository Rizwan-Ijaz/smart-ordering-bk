const express = require('express');
const router = express.Router();
const billController = require('../../controllers/customer/bill.controller');


router.post('/', billController.create);

module.exports = router;
