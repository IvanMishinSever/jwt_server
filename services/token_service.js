const jwt = require('jsonwebtoken');

const jwrAs = config.get('jwt-access-secret');
const jwrRs = config.get('jwt-refresh-secret');

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
        const tokenData = await pool.query(`
        SELECT user_id FROM refresh_tokens WHERE refresh_token = $1
        `,[refreshToken]);
        if (tokenData.rows.length > 0) {
            
            await pool.query(`INSERT INTO refresh_tokens (user_id, refresh_token)
            VALUES ($1, $2)
            `, [userId, refreshToken]);   
            return res.status(200).json({message:`User had token and had been rewriten`});

        }

    }
}
module.exports = new TokenService();