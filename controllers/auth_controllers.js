// DВРОДЕ НЕ УЧАСТВУЕТ В ПРИЛОЖЕНИИ



const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "root1987",
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
const {validationResult} = require('express-validator');

//
/*
check('email', "email uncorrect").isEmail(),
check('password', "password must be longer").isLength({min:3, max:12})
*/

class UsersAuth_controllers {
//REGISTRATION USERS
/*
    async registerUsers(req, res) {
        const {useremail, user_password} = req.body;
        try{

           
            //result validation
           const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message:"uncorrect reqest validation!"})
            }
    
    
    
            //
            const candidate = await pool.query(`
            SELECT * FROM users WHERE useremail = $1
            `,[useremail])

            if (candidate.rows.length > 0) {
                return res.status(400).json({message:`User with email ${useremail} exist`});
            }
            
            // if OK new USER
            
            const hashPassword = await bcrypt.hash(user_password, 7); 

            const newUser = await pool.query(`INSERT INTO users (useremail, user_password)
            VALUES ($1, $2)
            `, [useremail, hashPassword]);

            return res.json({message:'User was created!'})
            //return res.json(newUser)
            //



        } catch(e) {
            console.log(e);
            res.send({message:"server error"});
        }
    }
    */
    //LOGIN USERS
   
    async loginUsers(req, res){
        try{

        } catch(e) {
            console.log(e);
        }
    }
    //LOGOUT USERS
    async logoutUsers(req, res){
        try{

        } catch(e) {
            console.log(e);
        }
    } 
    //ACTIVATE USERS
    async activateUsers(req, res){
        try{

        } catch(e) {
            console.log(e);
        }
    }       
    //REFRESH
    async refreshUsers(req, res){
        try{

        } catch(e) {
            console.log(e);
        }
    }
    //GET USERS
    async getUsers(req, res){
        try{
            res.status(200).json(['222']);
        } catch(e) {
            console.log(e);
        }
    }
   
}
module.exports = new UsersAuth_controllers();

