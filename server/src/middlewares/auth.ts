import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"


dotenv.config()


const authMiddleware = (req:Request, res:Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

   if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(401).json({
            message: "not allowed "
        })
        return
    }

    const token = authHeader.split(" ")[1]

   
    if(!process.env.JWT_SECRET){
        return 
    }

    const jwtVerify = jwt.verify(token, process.env.JWT_SECRET)

    next()

}