
const express = require('express');

const usersControllers = require('../controllers/user_controller.js');



const logoutRouter = express.Router();

logoutRouter.get('/logout',usersControllers.logout);

module.exports = logoutRouter;