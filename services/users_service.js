

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
const {validationResult} = require('express-validator');

class UserService {
//REGISTRATION USERS
async registerUsers(req, res) {
    const {useremail, user_password} = req.body;
    try{

       
        //result validation
       const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({message:"uncorrect reqest validation!"})
        }



        //
        const activationLink = uuid.v4(); //create randon string
        await mailService.sendActivationMail(email, activationLink);

        //
        const candidate = await pool.query(`
        SELECT * FROM users WHERE useremail = $1
        `,[useremail]);

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
}
module.exports = new UserService();