import mydb from "../utils/db";



async function UserSchema () {



    try{
        // await mydb.query(`DROP TABLE IF EXISTS users`)
await mydb.query(`
    CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL
    
)
    `)
}catch(e){
    console.log(e)
}

}

UserSchema()

export default UserSchema