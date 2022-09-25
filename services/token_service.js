const jwt = require('jsonwebtoken');
const config = require('config');

const jwrAs = config.get('jwt-access-secret');
const jwrRs = config.get('jwt-refresh-secret');

//const Pool = require('pg').Pool;
const pool = require('../config/db.js');
/*
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
*/





//
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, jwrAs, {expiresIn:'5s'}); //LIFE TOKENS
        const refreshToken = jwt.sign(payload, jwrRs, {expiresIn:'30d'});
        return {
            accessToken,
            refreshToken
        }
    }
    //checking token for existing at the userId- if user has already logged
    async saveToken(userId, refreshToken) {
       // console.log(userId +" " + refreshToken);
        
        const tokenData = await pool.query(`
        SELECT refresh_tokens FROM refresh_tokens WHERE user_id = $1
        `,[userId]);
        //console.log(tokenData);
        if (tokenData.rows.length > 0) {
            
           const token = await pool.query(`UPDATE  refresh_tokens SET refresh_token = $1
           WHERE user_id = $2`, [refreshToken, userId]);   
           // return res.status(200).json({message:`User had token and had been rewriten`});
                return token;
        }
        

       //WITHOUT CHECKING USER'S TOKEN

        const token = await pool.query(`INSERT INTO refresh_tokens (id, user_id, refresh_token)
            VALUES (default, $1, $2)
            `, [userId, refreshToken]);   
           // return res.status(200).json({message:`User had token and had been rewriten`});
                return token;




    }
    //REMOVE TOKEN
    async removeToken(refreshToken) {
        const tokenData = await pool.query(`DELETE FROM refresh_tokens
    WHERE refresh_token = $1 `,[refreshToken]);
    return tokenData;
    }
    //VALIDATION TOKENS
    validateAccessToken(token) {
        try{
            const userData = jwt.verify(token, jwrAs);
            return userData;
        } catch(e){
            return null;
        }
    }
    validateRefreshToken(token) {
        try{
            console.log('start valid refresh token');
            const userData = jwt.verify(token, jwrRs);
            return userData;
        } catch(e){
            console.log('no valid refresh token')
            return null;
        }
}
    //FIND TOKEN
    async findToken(refreshToken) {
        console.log(refreshToken);
        console.log('start find token');
        const tokenData = await pool.query(`SELECT refresh_token FROM refresh_tokens
    WHERE refresh_token = $1 `,[refreshToken]);
    console.log(tokenData.rows[0]);
    return tokenData.rows[0];
    }
}
module.exports = new TokenService();