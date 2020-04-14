const router = require('express').Router();
const authMiddleware = require('../../middlewares/customer-auth.middleware');

function routes() {
    const checkIn = require('./checkIn.routes');
    const categoryController = require('../../controllers/category.controller');
    const itemController = require('../../controllers/item.controller');

    router.use('/checkIn', checkIn);
    router.get('/categories', authMiddleware, categoryController.getAll);
    router.get('/items', authMiddleware, itemController.getAll);
    return router;
}


module.exports = routes();

