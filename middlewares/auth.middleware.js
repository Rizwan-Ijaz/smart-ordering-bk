const jwt = require('jsonwebtoken');
const constants = require('../utils/constants');
const defaultResponse = require('../utils/defaultResponse');
const User = require('../models/user.model');
const responseCodes = require('../utils/responseCodes');

module.exports = (req, res, next) => {
    const token = req.headers['access-token'];
    if (token) {
        jwt.verify(token, 'PASSWORD', function (err, data) {
            if (err) {
                defaultResponse().error({message: constants.TOKEN_ERROR}, res, responseCodes.NO_TOKEN);
                return;
            } else {
                Object.assign(req, {
                    tokenUserId: data.id,
                    tokenEmail: data.email,
                    profile: data.profile,
                    userId: data.user
                });
                User.findById(data.id, (error, user) => {
                    if (error) {
                        defaultResponse().error({message: constants.TOKEN_ERROR}, res, responseCodes.NO_TOKEN);
                        return;
                    } else {
                        next();
                    }
                })
            }
        });
    } else {
        defaultResponse().error({message: constants.NO_TOKEN}, res, responseCodes.NO_TOKEN);
        return;
    }
};
