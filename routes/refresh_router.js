
const express = require('express');
const {check} = require('express-validator');
const userControllers = require('../controllers/user_controller.js');



const refreshRouter = express.Router();

refreshRouter.get('/refresh',userControllers.refresh);

module.exports = refreshRouter;