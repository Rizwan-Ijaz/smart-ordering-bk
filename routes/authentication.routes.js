const express = require('express');
const router = express.Router();
const authController = require('../controllers/authentication.controller');
const {forgetPassword}= require('../controllers/user.controller');

router.post('/signIn', authController.signIn);

router.get('/forgetPassword',forgetPassword);

module.exports = router;
