

const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "Book2021",
    host: "localhost",
    port: 5432,
    database: "jwtproject"
}, err => {
    if (err) {
        console.log(err);
    } else {
        console.log('Success baby!');
    }
});

//
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail_service');
const ApiError = require('../exceptions/api_error');

const tokenService = require('./token_service');
const UserDto = require('../dto/user_dto');
const config = require('config');
const url= config.get('api-url');
const secretAccessToken= config.get('jwt-access-secret');
const secretRefreshToken= config.get('jwt-refresh-secret');


class UserService {
//REGISTRATION USERS
async registerUsers(useremail, user_password) {
   // const {useremail, user_password} = req.body;
   // console.log(req.body);
   

       
        
        
        //
        const candidate = await pool.query(`
        SELECT * FROM users WHERE useremail = $1
        `,[useremail]);

        if (candidate.rows.length > 0) {
           // return useremail.status(400).json({message:`User with email ${useremail} exist`});
           //throw new Error(`User with email ${useremail} exist`);
          /* return {
               error: `User with email ${useremail} exist`
           }
          */ 
          throw ApiError.BedRequestAlreadyExist(`User with the email ${useremail}  already exists`);
        }
        
        // if OK new USER
        
        const hashPassword = await bcrypt.hash(user_password, 7); 
        const activationLink = uuid.v4(); //create randon string
        const newUser = await pool.query(`INSERT INTO users (useremail, user_password, activation_link)
        VALUES ($1, $2, $3)
        `, [useremail, hashPassword, activationLink]);

        const getnewUser = await pool.query(`SELECT * FROM users WHERE useremail = $1`, 
        [useremail]);
       // console.log(getnewUser.rows[0].id);
        //console.log(newUser);
       // return res.json({message:'User was created!'})
        //return res.json(newUser)
        //
        //
        
       //отключил почту НИЖЕ 
        await mailService.sendActivationMail(useremail, `${url}/api/auth/activate/${activationLink}`);

        const userDto = new UserDto(getnewUser.rows[0]);
        //console.log(userDto);
        const tokens = tokenService.generateTokens({...userDto});
        //console.log(tokens);
        //console.log(userDto.id +" " + tokens.refreshToken);
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}


  
}

//ACTIVATION MAIL
async activate(activationLink) {
    console.log(activationLink);
   // try {
        const user = await pool.query(`
        SELECT id FROM users WHERE activation_link = $1`, [activationLink]);
        if (user.rows.length === 0) {
            //throw Error('НЕАКТИВНАЯ ССЫЛКА!');
           /* return {
                error: 'НЕАКТИВНАЯ ССЫЛКА!'
            }
            */
           throw ApiError.BedRequest('НЕАКТИВНАЯ ССЫЛКА!');
        }
       // console.log(user.rows[0]);
        //console.log(user);
    
        const idUser = user.rows[0].id;
        await pool.query(`UPDATE  users SET is_activated = 'true' WHERE id = $1`, [idUser]);
        
        return {
            message: `User ${idUser} activated!`
        } 
        
  //  } catch(e){
  //      console.log(e);
  //  }

}

//LOGIN
async login(useremail, user_password) {
    const user = await pool.query(`
    SELECT * FROM users WHERE useremail = $1
    `,[useremail]);
    //console.log(user);
    if (user.rows.length === 0) {
       throw ApiError.BedRequestUserNotFound(`User with the email ${useremail}  is NOT found!`);
    }
    //CHECKING EQUAL PASSWORDS
    const gotpassword = user.rows[0].user_password;
    //console.log(gotpassword);
    const isPassEquels = await bcrypt.compare(user_password, gotpassword);
    if (!isPassEquels) {
        throw ApiError.BedRequestWrongPassword(`Wrong password!`);
     }
     //
     //console.log(user);
     const userDto = new UserDto(user.rows[0]);
     const tokens = tokenService.generateTokens({...userDto});
     //console.log(tokens);
     //console.log(userDto.id +" " + tokens.refreshToken);
     await tokenService.saveToken(userDto.id, tokens.refreshToken);
     return {...tokens, user: userDto}
}

//LOGOUT
async logout(refreshToken) {
    const token = tokenService.removeToken(refreshToken);
    
    return token;
}

//REFRESH
//check tokens
/*
validateAccessToken(token) {
    try{
        const userData = jwt.verify(token, secretAccessToken);
        return userData;
    } catch(e){
        return null;
    }
}
validateRefreshToken(token) {
    try{
        const userData = jwt.verify(token, secretRefreshToken);
        return userData;
    } catch(e){
        return null;
    }
}
*/

async refresh(refreshToken) {
    if (!refreshToken) {
        console.log('no refresh token');
         throw ApiError.UnauthorisedError();

    }
    console.log('start refresh service');
    const  userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken); 
    console.log(userData);
    console.log(tokenFromDb);
    if (userData) {
        console.log("VALID REFRESH TOKEN OK");;
    }
    if (tokenFromDb) {
        console.log(" REFRESH TOKEN EXIST");;
    }



    if (!userData || !tokenFromDb) {
        throw ApiError.UnauthorisedError();
    }


    const user = await pool.query(`
    SELECT * FROM users WHERE id = $1
    `,[userData.id]);
    const userDto = new UserDto(user.rows[0]);
    const tokens = tokenService.generateTokens({...userDto});
    //console.log(tokens);
    //console.log(userDto.id +" " + tokens.refreshToken);
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto}


}
async getAllUsers() {
    const users = await pool.query(`SELECT * FROM users`);
   // console.log(users);
    return users.rows;
}
}
module.exports = new UserService();