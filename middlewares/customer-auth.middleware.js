const jwt = require('jsonwebtoken');
const constants = require('../utils/constants');
const defaultResponse = require('../utils/defaultResponse');
const User = require('../models/user.model');
const responseCodes = require('../utils/responseCodes');
const CheckInModel = require('../models/checkIn.model');

module.exports = (req, res, next) => {
    const checkInId = req.headers['checkin-id'];
    if (checkInId) {
        const checkIn = CheckInModel.findById(checkInId);

        if (!checkIn || checkInId.status === 1) {
            defaultResponse().error({message: constants.TOKEN_ERROR}, res, responseCodes.NO_TOKEN);
        } else {
            req.checkIn = checkInId;
            next();
        }
    } else {
        defaultResponse().error({message: constants.NO_TOKEN}, res, responseCodes.NO_TOKEN);
        return;
    }
};
