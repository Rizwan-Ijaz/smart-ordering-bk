const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderModel = new Schema({
    checkIn: {type: Schema.Types.ObjectId, ref: 'CheckIn', required: true},
    dateTime: {type: Date, default: Date.now},
    status: {type: String, default: 'pending'},
    orderDetail: [{
        item: {type: Schema.Types.ObjectId, ref: 'Item', required: true},
        quantity: {type: String, required: true},
    }]
});

module.exports = mongoose.model('Order', OrderModel);
