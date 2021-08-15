
const express = require('express');
const {check} = require('express-validator');
const usersControllers = require('../controllers/user_controller');



const registrationRouter = express.Router();

registrationRouter.post('/registration',

[
    check('useremail', "email uncorrect").isEmail(),
    check('user_password', "password must be longer").isLength({min:3, max:12})
]
,
usersControllers.registration);

module.exports = registrationRouter;