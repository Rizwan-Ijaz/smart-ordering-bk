const defaultResponse = require('../utils/defaultResponse');
const responseCodes = require('../utils/responseCodes');
const CONSTANTS = require('../utils/constants');
const OrderModel = require('../models/order.model');
const mongoose = require('mongoose');


exports.getAll = async function (req, res) {
    try {
        const {status} = req.query;
        let orders;
        if (status) {
            orders = await OrderModel.find({status})
                .populate([
                    {
                        path: 'orderDetail.item', model: 'Item'
                    },
                    {
                        path: 'checkIn', model: 'CheckIn',
                        populate: {
                            path: 'table', model: 'Table'
                        }
                    }
                ]);
        } else {
            orders = await OrderModel.find()
                .populate([
                    {
                        path: 'orderDetail.item', model: 'Item'
                    },
                    {
                        path: 'checkIn', model: 'CheckIn',
                        populate: {
                            path: 'table', model: 'Table'
                        }
                    }
                ]);
        }


        defaultResponse().success(CONSTANTS.DATA_RETRIEVED, orders, res, responseCodes.SUCCESS);
    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};

exports.getById = async function (req, res) {
    try {
        const {id} = req.params;
        const order = await OrderModel.findById(id).populate({
            path: 'orderDetail.item', model: 'Item'
        });
        defaultResponse().success(CONSTANTS.DATA_RETRIEVED, order, res, responseCodes.SUCCESS);
    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};

exports.update = async function (req, res) {

    try {
        const requestBody = req.body;
        const updatedOrder = await OrderModel.findOneAndUpdate({_id: req.params.id}, requestBody, {new: true});
        defaultResponse().success(CONSTANTS.DATA_UPDATED_SUCCESS, updatedOrder, res, responseCodes.SUCCESS);

    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }

};
