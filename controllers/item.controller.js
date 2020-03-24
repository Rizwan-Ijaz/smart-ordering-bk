const ItemModel = require('../models/item.model');
const defaultResponse = require('../utils/defaultResponse');
const responseCodes = require('../utils/responseCodes');
const CONSTANTS = require('../utils/constants');

exports.create = async function (req, res) {

    try {
        const requestBody = req.body;
        requestBody.image = req.files && req.files.length > 0 ? req.files[0].filename : null;

        const item = new ItemModel(requestBody);
        await item.save();
        const newItem = await ItemModel.findById(item._id.toString());
        defaultResponse().success(CONSTANTS.DATA_CREATED_SUCCESS, newItem, res, responseCodes.SUCCESS_CREATED);

    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};

exports.delete = async function (req, res) {
    try {
        await ItemModel.remove({_id: req.params.id});
        defaultResponse().success(CONSTANTS.DATA_REMOVED_SUCCESS, {}, res, responseCodes.SUCCESS);
    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};

exports.getAll = async function (req, res) {
    try {
        const items = await ItemModel.find().populate({path: 'category'});
        defaultResponse().success(CONSTANTS.DATA_RETRIEVED, items, res, responseCodes.SUCCESS);
    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};

exports.getById = async function (req, res) {
    try {
        const {id} = req.params;
        const item = await ItemModel.findById(id).populate({path: 'category'});
        defaultResponse().success(CONSTANTS.DATA_RETRIEVED, item, res, responseCodes.SUCCESS);
    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};

exports.update = async function (req, res) {
    try {
        const requestBody = req.body;
        requestBody.image = req.files && req.files.length > 0 ? req.files[0].filename : null;

        const updatedItem = await ItemModel.findOneAndUpdate({_id: req.params.id}, requestBody, {new: true})
            .populate({path: 'category'});
        defaultResponse().success(CONSTANTS.DATA_UPDATED_SUCCESS, updatedItem, res, responseCodes.SUCCESS);

    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};

