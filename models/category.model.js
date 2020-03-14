const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoryModel = new Schema({
    name: {type: String, required: true}
});

module.exports = mongoose.model('Category', CategoryModel);
