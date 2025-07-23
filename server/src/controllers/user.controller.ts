import { Request, Response } from "express";
import mydb from "../utils/db";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import z from "zod"

const UserScheme = z.object({
    username: z.string().max(20),
    email: z.email(),
    password: z.string().min(6),
})


export const signup = async (req:Request, res:Response) => {

    console.log(req.body)

    const {username, email, password} = req.body

    const {success} = UserScheme.safeParse({username, email, password})
    
    if(!success){
        return res.status(404).json({
            msg: "error"
        })
    }

    
  
    const [existingUser]:any= await mydb.query<any[]>(`SELECT * FROM users WHERE username=?`, [username])

    if(existingUser.length>0){
        return res.status(404)     
    }


    const cryptPassword = await bcrypt.hash(password, 10)

  
   
    const sql = `INSERT INTO users (username, email, password) 
        VALUES (?,?,?)`
  const [result]= await mydb.query<any>(sql, [username, email, cryptPassword ] )
      const payload = {
        id: result.insertId,
        username: username,
        email: email
    }
    
    if(!process.env.JWT_SECRET) {
        return res.status(401).json({
            message: "auth error"
        })
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET)

    res.json({
        token: token
    }).status(200)
}


export const signin = async (req: Request, res: Response) => {

    console.log(req.body)

    const {identity, password} = req.body

    if(!identity || !password){
        return res.status(500).json({
            msg:"cehck inputs"
        })
    }

    if(!identity.includes("@")){
        const sql = `SELECT * FROM users WHERE username=?`
        const [selected]= await mydb.query<any>(sql, [identity])

        if(selected.length<= 0){
            return res.status(400).json({
                msg: "error"
            })
        }
        const hashedPassword:any= selected[0].password
        const pass = await bcrypt.compare(password, hashedPassword)

        const payload = {
            id: selected[0].id,
            username: identity,
        }

        if(!process.env.JWT_SECRET){
            return res.status(400)
        }
        if(pass){
            const token = jwt.sign(payload, process.env.JWT_SECRET)
            res.json({
                token: token
            })
        }
    }else{
        const sql = `SELECT * FROM users WHERE email=?`
        const [selected] = await mydb.query<any>(sql, [identity])

        if(selected.length<=0){
            return res.status(400).json({
                msg: "error"
            })
        }

        const hashedPassword:any = selected[0].password
        if(!process.env.JWT_SECRET){
            return res.status(404)
        }
        const pass = await bcrypt.compare(password, hashedPassword)

        const payload = {
            id: selected[0].id,
            email: identity
        }

        if(pass){
            const token = jwt.sign(payload, process.env.JWT_SECRET )
            res.status(200).json({
                token: token
            })
        }
    }
}