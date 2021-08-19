
const express = require('express');
const {check} = require('express-validator');
const usersControllers = require('../controllers/user_controller');



const loginRouter = express.Router();

loginRouter.post('/login',[
    check('useremail', "email uncorrect").isEmail(),
    check('user_password', "password must be longer").isLength({min:3, max:12})
]
,usersControllers.login);

module.exports = loginRouter;