const Pool = require('pg').Pool
/*const pool = new Pool({
    user: "postgres",
    password: "Book2021",
    host: "localhost",
    port: 5432,
    database: "jwtproject"
});
*/
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

module.exports = pool;