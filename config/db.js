const Pool = require('pg').Pool;

//const useUserRole = 'role_for_auth';
//GET USER ROLE AND PASSWORD
const userRoleService = require('../services/userRoles_service');
//const userRole1 =  userRoleService.getRoleUser();
const userRole =  userRoleService.getRoleUser().userRole;
const userPassword =  userRoleService.getRoleUser().userPassword;
console.log('role   '+ userRole+" "+userPassword);
//console.log('role   '+ userRole1);
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
  // user: "postgres",
   // password: "root1987",
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