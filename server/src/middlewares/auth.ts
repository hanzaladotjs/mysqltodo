import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"




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

    const jwtVerify:any = jwt.verify(token, process.env.JWT_SECRET)
    

    req.userId = jwtVerify.id
    next()

}

export default authMiddleware