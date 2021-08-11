
const express = require('express');
const {check} = require('express-validator');
const authControllers = require('../controllers/auth_controllers.js');



const usersRouter = express.Router();

usersRouter.get('/',authControllers.getUsers);

module.exports = usersRouter;