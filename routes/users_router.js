
const express = require('express');
const {check} = require('express-validator');
const userControllers = require('../controllers/user_controller.js');



const usersRouter = express.Router();

usersRouter.get('/',userControllers.getAllUsers);

module.exports = usersRouter;