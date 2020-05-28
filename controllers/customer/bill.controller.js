const defaultResponse = require('../../utils/defaultResponse');
const responseCodes = require('../../utils/responseCodes');
const CONSTANTS = require('../../utils/constants');
const BillModel = require('../../models/bill.model');

exports.create = async function (req, res) {
    try {
        const requestBody = req.body;
        requestBody.checkIn = req.headers['checkin-id'];
        const bill = new BillModel(requestBody);
        await bill.save();

        defaultResponse().success(CONSTANTS.DATA_CREATED_SUCCESS, bill, res, responseCodes.SUCCESS_CREATED);

    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};
