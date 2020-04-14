const defaultResponse = require('../../utils/defaultResponse');
const responseCodes = require('../../utils/responseCodes');
const CONSTANTS = require('../../utils/constants');
const CheckInModel = require('../../models/checkIn.model');
const TableModel = require('../../models/table.model');

exports.create = async function (req, res) {
    try {
        const requestBody = req.body;

        const table = await TableModel.findOne({checkInCode: requestBody.checkInCode});

        requestBody.table = table._id;
        requestBody.checkInTime = new Date();
        requestBody.status = 0; // 0 for checked In & 1 for checked out
        const checkIn = new CheckInModel(requestBody);
        await checkIn.save();

        defaultResponse().success(CONSTANTS.DATA_CREATED_SUCCESS, checkIn, res, responseCodes.SUCCESS_CREATED);

    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};

exports.delete = async function (req, res) {
    try {
        await CheckInModel.remove({_id: req.params.id});
        defaultResponse().success(CONSTANTS.DATA_REMOVED_SUCCESS, {}, res, responseCodes.SUCCESS);
    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};

exports.getAll = async function (req, res) {
    try {
        const checkIns = await CheckInModel.find();
        defaultResponse().success(CONSTANTS.DATA_RETRIEVED, checkIns, res, responseCodes.SUCCESS);
    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};

exports.getById = async function (req, res) {
    try {
        const {id} = req.params;
        const checkIn = await CheckInModel.findById(id);
        defaultResponse().success(CONSTANTS.DATA_RETRIEVED, checkIn, res, responseCodes.SUCCESS);
    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};

exports.update = async function (req, res) {

    try {
        const requestBody = req.body;
        const updatedCheckIn = await CheckInModel.findOneAndUpdate({_id: req.params.id}, requestBody, {new: true});
        defaultResponse().success(CONSTANTS.DATA_UPDATED_SUCCESS, updatedCheckIn, res, responseCodes.SUCCESS);

    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }

};
