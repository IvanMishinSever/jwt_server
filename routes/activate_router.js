
const express = require('express');
const {check} = require('express-validator');
const authControllers = require('../controllers/auth_controllers.js');



const activateRouter = express.Router();

activateRouter.get('/activate/:link',authControllers.activateUsers);

module.exports = activateRouter;