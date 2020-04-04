const UserModel = require('../models/user.model');
const defaultResponse = require('../utils/defaultResponse');
const responseCodes = require('../utils/responseCodes');
const CONSTANTS = require('../utils/constants');
const bcrypt = require('bcrypt');

exports.create = async function (req, res) {

    try {
        const requestBody = req.body;
        bcrypt.hash(requestBody.password, 10, async (error, hash) => {
            if (error) {
                console.log('Error: ' + error.message);
                defaultResponse({message: error.message}, res, responseCodes.SERVER_ERROR)
            } else {
                requestBody.password = hash;
                const user = new UserModel(requestBody);
                await user.save();
                defaultResponse().success(CONSTANTS.DATA_CREATED_SUCCESS, user, res, responseCodes.SUCCESS_CREATED);
            }
        });
    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};

exports.seeding = async function (req, res) {
    try {

        req.body = {
            name: 'Admin',
            email: 'admin@admin.com',
            password: 'password'
        };

        await exports.create(req, res);

    } catch (error) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};

exports.update = async function (req, res) {
    try {
        const requestBody = req.body;
        bcrypt.hash(requestBody.password, 10, async (error, hash) => {
            if (hash) {
                requestBody.password = hash;
                const updatedUser = await UserModel.findOneAndUpdate({_id: req.params.id}, requestBody, {new: true});
                defaultResponse().success(CONSTANTS.DATA_UPDATED_SUCCESS, updatedUser, res, responseCodes.SUCCESS);
            } else {
                defaultResponse({message: error.message}, res, responseCodes.SERVER_ERROR)
            }
        });
    } catch (error) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};
