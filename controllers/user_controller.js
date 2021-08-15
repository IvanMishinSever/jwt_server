const userService = require('../services/users_service');
//const { loginUsers } = require('./auth_controllers');
const {validationResult} = require('express-validator');

class UserController {
    async registration(req, res, next) {
        try {
            const {useremail, user_password} = req.body;
           // console.log(req.body);

            //result validation
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
           return res.status(400).json({message:"uncorrect reqest validation!"})
       }


            const userData = await userService.registerUsers(useremail, user_password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 38*24*60*60*1000, httpOnly: true});
            return res.json(userData);
        } catch(e) {
            console.log(e);
        }
      
    }
    async login(req, res, next){

    }  
}

module.exports = new UserController();