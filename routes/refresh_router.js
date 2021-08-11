
const express = require('express');
const {check} = require('express-validator');
const authControllers = require('../controllers/auth_controllers.js');



const refreshRouter = express.Router();

refreshRouter.get('/refresh',authControllers.refreshUsers);

module.exports = refreshRouter;