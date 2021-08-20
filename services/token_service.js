const jwt = require('jsonwebtoken');
const config = require('config');

const jwrAs = config.get('jwt-access-secret');
const jwrRs = config.get('jwt-refresh-secret');

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
class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, jwrAs, {expiresIn:'30m'});
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
}
module.exports = new TokenService();