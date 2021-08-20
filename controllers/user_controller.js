const userService = require('../services/users_service');
//const { loginUsers } = require('./auth_controllers');
const {validationResult} = require('express-validator');
const config = require('config');
const clientUrl = config.get('client-url');
const ApiError = require('../exceptions/api_error');

class UserController {
    async registration(req, res, next) {
        try {
            const {useremail, user_password} = req.body;
           // console.log(req.body);

            //result validation
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
          // return res.status(400).json({message:"uncorrect reqest validation!"})
          console.log(errors);
            return next(ApiError.BedRequest('uncorrect reqest validation!', errors.array()));
       }


            const userData = await userService.registerUsers(useremail, user_password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 38*24*60*60*1000, httpOnly: true});
            return res.json(userData);
        } catch(e) {
           // console.log(e); // НЕ ПРИХОДИТ СЮДА ОШИБКА????
           next(e);
        }
      
    }
    async login(req, res, next){
        try {
            const {useremail, user_password} = req.body;
            const  userData = await userService.login(useremail, user_password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 38*24*60*60*1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            //console.log(e);
            next(e)
        }
        

    } 
    async activate(req, res, next) {
        try {

            
            const activationLink = req.params.link;
            const act = await userService.activate(activationLink);
            return  res.redirect(clientUrl);
         //  console.log(act);
           // return res.status;

        } catch(e) {
            //console.log(e);
            next(e);
        }
    }
    async logout(req, res, next) {
        try{
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken'); // delete cookie
            return res.json(token);



        } catch(e) {
            next(e);
        }
    }
}

module.exports = new UserController();