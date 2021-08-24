const ApiError =    require('../exceptions/api_error');
const tokenService = require('../services/token_service');
module.exports = function(req, res, next) {
    try{
        const authorizationHeader = req.headers.authorization;
        //console.log(req.headers.authorization);
        if (!authorizationHeader) {
            console.log('no header authorization');
            //console.log('no header');

           return  next(ApiError.UnauthorisedError());
       
       // throw ApiError.UnauthorisedError()
        }
        
        const accessToken = authorizationHeader.split(' ')[1];
       // console.log(accessToken);
        if (!accessToken) {
            console.log('no access token');
           return  next(ApiError.UnauthorisedError());
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            console.log('no userData');
            return next(ApiError.UnauthorisedError());
        }
        // ЕСЛИ РАЗЛОГИНИЛСЯ??? NO REFRESH TOKEN BUT ACESS TOKEN EXIST!!!!!!!!!!!



        req.user = userData; // ?????
        next();
        
    } catch(e){
        console.log(e);
         return next(ApiError.UnauthorisedError()); 
    }
}