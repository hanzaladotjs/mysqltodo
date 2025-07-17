import mydb from "../utils/db";


async function UserSchema () {

    try{
await mydb.query(`
    CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
    `)
}catch(e){
    console.log(e)
}

}

export default UserSchema