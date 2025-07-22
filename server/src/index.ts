import express, { NextFunction, Request, Response } from "express"
import mainrouter from "./routes"

const app = express()
app.use(express.json())


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