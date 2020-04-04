const router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware');


function routes() {
    const auth = require('./authentication.routes');
    const category = require('./category.routes');
    const item = require('./item.routes');
    const user = require('./user.routes');

    router.use('/auth', auth);
    router.use('/category', authMiddleware, category);
    router.use('/item', authMiddleware, item);
    router.use('/seeding', user);
    router.use('/user', authMiddleware, user);
    return router;
}


module.exports = routes();

