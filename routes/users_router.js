
const express = require('express');
const {check} = require('express-validator');
const usersControllers = require('../controllers/user_controller.js');



const usersRouter = express.Router();

usersRouter.get('/',usersControllers.getAllUsers);

module.exports = usersRouter;