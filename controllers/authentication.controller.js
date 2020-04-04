const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const defaultResponse = require('../utils/defaultResponse');
const responseCodes = require('../utils/responseCodes');
const CONSTANTS = require('../utils/constants');

exports.signIn = async (req, res) => {
    const requestBody = req.body;
    try {
        const user = await UserModel.findOne({email: requestBody.email});

        if (user) {
            bcrypt.compare(requestBody.password, user.password, (error, success) => {
                if (success) {
                    const token = jwt.sign({user: user._id}, "PASSWORD", {expiresIn: '7d'});
                    defaultResponse().success({message: CONSTANTS.USER_SIGNEDIN}, {
                        token,
                        user
                    }, res, responseCodes.SUCCESS);
                } else {
                    defaultResponse().error({message: CONSTANTS.INVALID_CREDENTIALS}, res, responseCodes.BAD_REQUEST);
                }
            });
        } else {
            defaultResponse().error({message: CONSTANTS.INVALID_CREDENTIALS}, res, responseCodes.BAD_REQUEST);
        }

    } catch (error) {
        defaultResponse().error({message: error.message}, res, responseCodes.SERVER_ERROR);
    }
};

// exports.signOut = (req, res) => {
//     const token = req.headers['access-token'];
//     try {
//         jwtBlacklist.blacklist(token);
//         res.status(200).json({message: 'User is logged-out'});
//     } catch (error) {
//         res.status(500).json({message: error})
//     }
// };
