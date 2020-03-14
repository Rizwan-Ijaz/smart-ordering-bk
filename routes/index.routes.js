const router = require('express').Router();


function routes() {
    const category = require('./category.routes');
    const item = require('./item.routes');

    router.use('/category', category);
    router.use('/item', item);

    return router;
}


module.exports = routes();

