import express, { NextFunction, Request, Response } from "express"
import "./models/user.model"
import "./models/todo.model"
import mainrouter from "./routes"
import "./utils/env"

import cors from "cors"
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use("/api", mainrouter)

app.use((err:Error, req:Request, res:Response, next:NextFunction)=>{
    console.log(err)

    res.status(500).json({
        error: err.message
    })
})




app.listen(3000, () => {
    console.log("listening on 3000")
})