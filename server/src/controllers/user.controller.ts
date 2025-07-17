import { Request, Response } from "express";
import mydb from "../utils/db";

const signup = (req:Request, res:Response) => {

    const {username, email, password} = req.body

    if(!username || !email || !password ){
        return res.status(404).json({
            msg: "fill everything"
        })
    }

    const exists = await mydb.query(``)
    if()

}