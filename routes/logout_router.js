
const express = require('express');
const {check} = require('express-validator');
const userControllers = require('../controllers/user_controller.js');



const logoutRouter = express.Router();

logoutRouter.post('/logout',userControllers.logout);

module.exports = logoutRouter;