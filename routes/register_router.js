
const express = require('express');
const {check} = require('express-validator');
const usersControllers = require('../controllers/user_controller');
const {body} = require('express-validator');


const registrationRouter = express.Router();

// WE CAN DO VALIDATION THROUGH CHECK FUNCTION

registrationRouter.post('/registration',

[
    check('useremail', "email uncorrect").isEmail(),
    check('user_password', "password must be longer").isLength({min:3, max:12})
]
,
usersControllers.registration);

/*
registrationRouter.post('/registration',


    body('useremail', "email uncorrect").isEmail(),
    body('user_password', "password must be longer").isLength({min:3, max:12})

,
usersControllers.registration);
*/
module.exports = registrationRouter;