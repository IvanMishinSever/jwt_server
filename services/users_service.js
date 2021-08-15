

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

const tokenService = require('./token_service');
const UserDto = require('../dto/user_dto');



class UserService {
//REGISTRATION USERS
async registerUsers(useremail, user_password) {
   // const {useremail, user_password} = req.body;
   // console.log(req.body);
    try{

       
        
        
        //
        const candidate = await pool.query(`
        SELECT * FROM users WHERE useremail = $1
        `,[useremail]);

        if (candidate.rows.length > 0) {
           // return useremail.status(400).json({message:`User with email ${useremail} exist`});
           //throw new Error(`User with email ${useremail} exist`);
           return {
               error: `User with email ${useremail} exist`
           }
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
        
        await mailService.sendActivationMail(useremail, activationLink);

        const userDto = new UserDto(getnewUser.rows[0]);
        //console.log(userDto);
        const tokens = tokenService.generateTokens({...userDto});
        //console.log(tokens);
        //console.log(userDto.id +" " + tokens.refreshToken);
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}


    } catch(e) {
        console.log(e);
        res.send({message:"server error"});
    }
}
}
module.exports = new UserService();