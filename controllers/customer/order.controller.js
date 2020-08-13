const defaultResponse = require('../../utils/defaultResponse');
const responseCodes = require('../../utils/responseCodes');
const CONSTANTS = require('../../utils/constants');
const OrderModel = require('../../models/order.model');
const mongoose = require('mongoose');

exports.create = async function (req, res) {
    try {
        const requestBody = req.body;
        requestBody.checkIn = req.headers['checkin-id'];
        const order = new OrderModel(requestBody);
        await order.save();

        defaultResponse().success(CONSTANTS.DATA_CREATED_SUCCESS, order, res, responseCodes.SUCCESS_CREATED);

    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};

exports.get = async function (req, res) {
    try {
        const checkInId = req.headers['checkin-id'];
        const orders = await OrderModel.find({checkIn: checkInId}).populate({
            path: 'orderDetail.item', model: 'Item'
        });

        const totalPrice = orders.reduce((orderSum, order) => {
            const price = order.orderDetail.reduce((sum, current) => {
                return sum += (current.item.price * current.quantity);
            }, 0);
            orderSum = orderSum + price;
            return orderSum;
        }, 0);

        const data = {totalPrice, orders};

        defaultResponse().success(CONSTANTS.DATA_RETRIEVED, data, res, responseCodes.SUCCESS);
    } catch (err) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }

};
