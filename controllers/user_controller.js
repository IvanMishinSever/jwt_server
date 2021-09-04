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
            console.log('CookiesLOGIN: ', req.cookies)
            const  userData = await userService.login(useremail, user_password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 38*24*60*60*1000, httpOnly: true});
           
            return res.json(userData);
        } catch (e) {
            //console.log(e);
            next(e)
        }
        

    } 
    //ACTIVATION
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
    //LOGOUT
    async logout(req, res, next) {
        try{
           console.log('token delete');
           //console.log(req)
           
           const {refreshToken} = req.cookies;
           console.log('CookiesLOGOUT: ', refreshToken)
           //console.log("reft" + refreshToken);
           const token = await userService.logout(refreshToken);
           
           // res.clearCookie('refreshToken',{domain: "http://localhost:3000"});
            res.clearCookie('refreshToken'); // delete cookie
          // res.cookie('refreshToken', "asd");
            return res.status(204).json({message:'token deleted'});
             
           // return res.json(token);
           //return res.json({message:'token deleted'});

        } catch(e) {
            next(e);
        }
    }
    //REFRESH
    async refresh(req, res, next) {
       // console.log(req);
        try{
           // console.log(req.cookies);
            const {refreshToken} = req.cookies;
           // console.log(refreshToken);
            const  userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 38*24*60*60*1000, httpOnly: true});
            return res.json(userData);
        } catch(e) {
            console.log('no start refresh controller');
            next(e);
        }
    }
    //GET ALL USERS
    async getAllUsers(req, res, next) {
        try{
            console.log('work get');
            const users = await userService.getAllUsers();
            console.log(users);
             return res.json(users);

        } catch(e) {
            console.log(e);
            //next(e);
        }
    }
}

module.exports = new UserController();