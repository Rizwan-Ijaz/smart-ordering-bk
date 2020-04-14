const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TableModel = new Schema({
    checkInCode:{type: String, required: true},
    size: {type: String, required: true}
});

module.exports = mongoose.model('Table', TableModel);
