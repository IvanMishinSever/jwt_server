
const express = require('express');
const {check} = require('express-validator');
const authControllers = require('../controllers/auth_controllers.js');



const logoutRouter = express.Router();

logoutRouter.post('/logout',authControllers.logoutUsers);

module.exports = logoutRouter;