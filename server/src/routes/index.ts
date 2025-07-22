import express from "express"
import todorouter from "./todo.routes"
import userrouter from "./user.routes"


const mainrouter = express.Router()


mainrouter.use("/todos", todorouter)
mainrouter.use("/user", userrouter)

export default mainrouter