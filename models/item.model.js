const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemModel = new Schema({
    name: {type: String, required: true},
    image: {type: String},
    price: {type: Number, required: true},
    description: {type: String},
    category: {type: Schema.Types.ObjectId, ref: 'Category', required: true}
});

module.exports = mongoose.model('Item', ItemModel);
