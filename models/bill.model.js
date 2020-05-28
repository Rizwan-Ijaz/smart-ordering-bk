const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BillModel = new Schema({
    checkIn: {type: Schema.Types.ObjectId, ref: 'CheckIn', required: true},
    dateTime: {type: Date, default: Date.now},
    paymentType: {type: String, required: true},
    status: {type: String, default: 'pending'},
    amount: {type: String, required: true}
});

module.exports = mongoose.model('Bill', BillModel);
