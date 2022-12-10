const Pool = require('pg').Pool;


//GET USER ROLE AND PASSWORD
const userRoleService = require('../services/userRoles_service');
const userRole =userRoleService.getRoleUser().userRole;
const userPassword =userRoleService.getRoleUser().userPassword;
console.log('role   '+ userRole+userPassword);

/*const pool = new Pool({
    user: "postgres",
    password: "Book2021",
    host: "localhost",
    port: 5432,
    database: "jwtproject"
});
*/


const pool = new Pool({
    user: userRole,
    password: userPassword,
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