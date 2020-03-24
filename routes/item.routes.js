const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');
var multer = require('multer');

var storage = multer.diskStorage(
    {
        destination: './uploads/',
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ''));
        }
    }
);
var upload = multer({storage: storage});

router.get('/', itemController.getAll);
router.get('/:id', itemController.getById);
router.post('/', upload.any(), itemController.create);
router.put('/:id', upload.any(), itemController.update);
router.delete('/:id', itemController.delete);
module.exports = router;
