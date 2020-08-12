const UserModel = require('../models/user.model');
const defaultResponse = require('../utils/defaultResponse');
const responseCodes = require('../utils/responseCodes');
const CONSTANTS = require('../utils/constants');
const bcrypt = require('bcrypt');
const nodeMailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const jwt = require('jsonwebtoken');


exports.getAll = async function (req, res) {
    try {
        const users = await UserModel.find();
        defaultResponse().success(CONSTANTS.DATA_RETRIEVED, users, res, responseCodes.SUCCESS);

    } catch (e) {
        defaultResponse().error({message: err.message}, res, responseCodes.SERVER_ERROR);
    }
};

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

exports.deleteUser = async function (req, res) {
    try {
        await UserModel.findByIdAndDelete(req.params.id);
        defaultResponse().success(CONSTANTS.DATA_REMOVED_SUCCESS, {}, res, responseCodes.SUCCESS);
    } catch (e) {
        defaultResponse().error({message: e.message}, res, responseCodes.SERVER_ERROR);
    }
};

exports.seeding = async function (req, res) {
    try {

        req.body = {
            name: 'Admin',
            email: 'admin@admin.com',
            password: 'password',
            isAdmin: true,
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

exports.forgetPassword = async (req, res) => {
    try {
        let requestBody = req.body != null ? req.body : defaultResponse().error({message: CONSTANTS.INVALID_CREDENTIALS}, res, responseCodes.BAD_REQUEST);
        let user = await UserModel.findOne({email: requestBody.email});
        if (user) {
            let tokenData = {id: user._id};
            const url = `http://localhost:4200/reset?token=${jwt.sign(tokenData, 'PASSWORD')}`;

            const smtpTransport = nodeMailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                auth: {
                    user: `smartordering18@gmail.com`,
                    pass: `smartordering786`
                }
            });

            var data = {
                to: user.email,
                from: `Smart Ordering<${`smartordering18@gmail.com`}>`,
                subject: 'Password reset',
                text: `To reset your password click on this link: ${url}`,
            };
            smtpTransport.sendMail(data, function (error) {
                if (error) {
                    defaultResponse().error({message: error.message}, res, 400);
                    return;
                } else {
                    defaultResponse().success({message: 'password reset email is sent'}, user, res, 200);
                }
            })
        } else {
            defaultResponse().error({message: CONSTANTS.INVALID_CREDENTIALS}, res, responseCodes.BAD_REQUEST);
            return;
        }
    } catch
        (exception) {
        defaultResponse().error({message: exception.message}, res, responseCodes.BAD_REQUEST);
        return;
    }
}

exports.passwordUpdate = async (req, res) => {
    console.log()
    let requestBody = req.body != null ? req.body : defaultResponse().error({message: CONSTANTS.INVALID_CREDENTIALS}, res, responseCodes.BAD_REQUEST);
    // req.checkBody('oldPassword', "Please provide old password.").notEmpty();

    try {
        const user = await UserModel.findById(req.userId);
        // const oldPassCheck = await bcrypt.compare(requestBody.oldPassword, user.password);
        // if (user && oldPassCheck) {

        const newPass = await bcrypt.hash(requestBody.password, Number(10));
        const data = await UserModel.findByIdAndUpdate(req.userId, {password: newPass});
        if (data) {
            defaultResponse().success(CONSTANTS.DATA_UPDATED_SUCCESS, data, res, responseCodes.SUCCESS);
        }
        // } else {
        //     defaultResponse().error({message: 'The old password did not match'}, res, errorCode.ERROR);
        // }
    } catch
        (exception) {
        defaultResponse().error({message: exception.message}, res, responseCodes.BAD_REQUEST);
    }
}
