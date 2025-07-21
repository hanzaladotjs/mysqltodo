import mysql from "mysql2/promise"
import dotenv from "dotenv"


dotenv.config()


if(!process.env.DATABASE_URI){
    throw new Error("db uri not found")
}

const mydb =  mysql.createPool(process.env.DATABASE_URI)




export default mydb