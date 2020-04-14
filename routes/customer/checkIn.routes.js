const express = require('express');
const router = express.Router();
const checkInController = require('../../controllers/customer/check-in.controller');

router.get('/', checkInController.getAll);
router.get('/:id', checkInController.getById);
router.post('/', checkInController.create);
router.put('/:id', checkInController.update);
router.delete('/:id', checkInController.delete);

module.exports = router;
