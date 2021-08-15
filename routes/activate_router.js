
const express = require('express');
const {check} = require('express-validator');
const userControllers = require('../controllers/user_controller');



const activateRouter = express.Router();

activateRouter.get('/activate/:link',userControllers.activate);

module.exports = activateRouter;