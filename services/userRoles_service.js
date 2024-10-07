class UserRoleService {

//get role of user
 getRoleUser() {

    //const users = await pool.query(`SELECT * FROM users`);
    //console.log(users);
    //return users.rows;

    const userRoleData =  {
        userRole: "postgres",
        userPassword: "root1987"
    }
    return userRoleData;
}


}
module.exports = new UserRoleService();