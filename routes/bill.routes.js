const express = require('express');
const router = express.Router();
const billController = require('../controllers/bill.controller');


router.get('/', billController.get);
router.put('/:id', billController.update);

module.exports = router;
