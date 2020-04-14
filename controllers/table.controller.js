const defaultResponse = require('../utils/defaultResponse');
const responseCodes = require('../utils/responseCodes');
const CONSTANTS = require('../utils/constants');
const TableModel = require('../models/table.model');

exports.create = async function (req, res) {
    try {
        const requestBody = req.body;
        const table = new TableModel(requestBody);
        await table.save();

        defaultResponse().success(CONSTANTS.DATA_CREATED_SUCCESS, table, res, responseCodes.SUCCESS_CREATED);

    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};

exports.delete = async function (req, res) {
    try {
        await TableModel.remove({_id: req.params.id});
        defaultResponse().success(CONSTANTS.DATA_REMOVED_SUCCESS, {}, res, responseCodes.SUCCESS);
    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};

exports.getAll = async function (req, res) {
    try {
        const tables = await TableModel.find();
        defaultResponse().success(CONSTANTS.DATA_RETRIEVED, tables, res, responseCodes.SUCCESS);
    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};

exports.getById = async function (req, res) {
    try {
        const {id} = req.params;
        const category = await TableModel.findById(id);
        defaultResponse().success(CONSTANTS.DATA_RETRIEVED, category, res, responseCodes.SUCCESS);
    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};

exports.update = async function (req, res) {

    try {
        const requestBody = req.body;
        const updatedTable = await TableModel.findOneAndUpdate({_id: req.params.id}, requestBody, {new: true});
        defaultResponse().success(CONSTANTS.DATA_UPDATED_SUCCESS, updatedTable, res, responseCodes.SUCCESS);

    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }

};
