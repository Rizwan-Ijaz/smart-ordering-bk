const express = require('express');
const router = express.Router();
const tableController = require('../controllers/table.controller');

router.get('/', tableController.getAll);
router.get('/:id', tableController.getById);
router.post('/', tableController.create);
router.put('/:id', tableController.update);
router.delete('/:id', tableController.delete);

module.exports = router;
