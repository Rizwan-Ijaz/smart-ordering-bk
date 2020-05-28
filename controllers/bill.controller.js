const defaultResponse = require('../utils/defaultResponse');
const responseCodes = require('../utils/responseCodes');
const CONSTANTS = require('../utils/constants');
const BillModel = require('../models/bill.model');

exports.get = async function (req, res) {
    try {

        const pendingRequestedBills = await BillModel.find({status: 'pending'}).populate({
            path: 'checkIn',
            populate: [{
                path: 'table'
            }]
        });

        defaultResponse().success(CONSTANTS.DATA_CREATED_SUCCESS, pendingRequestedBills, res, responseCodes.SUCCESS);

    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};

exports.update = async function (req, res) {
    try {
        const {id} = req.params;
        const requestBody = req.body;
        const bill = await BillModel.findByIdAndUpdate({_id: req.params.id}, requestBody, {new: true})
            .populate({
                path: 'checkIn',
                populate: [{
                    path: 'table'
                }]
            });
        defaultResponse().success(CONSTANTS.DATA_UPDATED_SUCCESS, bill, res, responseCodes.SUCCESS);

    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};
