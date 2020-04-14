const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CheckInModel = new Schema({
    table: {type: Schema.Types.ObjectId, ref: 'Table', required: true},
    checkInTime: {type: Date},
    checkOutTime: {type: Date},
    status: {type: String}
});

module.exports = mongoose.model('CheckIn', CheckInModel);
