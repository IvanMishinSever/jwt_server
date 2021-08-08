
const express = require('express');
const {check} = require('express-validator');
const authControllers = require('../controllers/auth_controllers.js');



const registrationRouter = express.Router();

registrationRouter.post('/registration',[
    check('useremail', "email uncorrect").isEmail(),
    check('user_password', "password must be longer").isLength({min:3, max:12})
]
,authControllers.registerUsers);

module.exports = registrationRouter;