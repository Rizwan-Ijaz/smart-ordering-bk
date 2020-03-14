const CategoryModel = require('../models/category.model');
const defaultResponse = require('../utils/defaultResponse');
const responseCodes = require('../utils/responseCodes');
const CONSTANTS = require('../utils/constants');

exports.create = async function (req, res) {
    try {
        const requestBody = req.body;

        const category = new CategoryModel(requestBody);
        await category.save();

        defaultResponse().success(CONSTANTS.DATA_CREATED_SUCCESS, category, res, responseCodes.SUCCESS_CREATED);

    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};

exports.getAll = async function (req, res) {
    try {
        const categories = await CategoryModel.find();
        defaultResponse().success(CONSTANTS.DATA_RETRIEVED, categories, res, responseCodes.SUCCESS);
    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};

exports.update = async function (req, res) {

    try {
        const requestBody = req.body;
        const updatedCategory = await CategoryModel.findOneAndUpdate({_id: req.params.id}, requestBody, {new: true});
        defaultResponse().success(CONSTANTS.DATA_UPDATED_SUCCESS, updatedCategory, res, responseCodes.SUCCESS);

    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }

};
