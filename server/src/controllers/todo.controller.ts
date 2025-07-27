import { Request, Response } from "express";
import mydb from "../utils/db";
import { any, safeParse, z } from "zod"


const todoScheme = z.object({
    name: z.string().max(20),
    detail: z.string(),
    checkbox: z.boolean(),

})


type Todo = z.infer<typeof todoScheme>


export const getTodos = async (req: Request, res:Response)=> {

    const userId = req.userId

    const [todos]= await mydb.query(`SELECT * FROM todos where userId=?`, [userId])

    res.status(200).json({
        todos: todos
    })

}

export const Add = async (req: Request, res: Response) => {
    const { name, detail, checkbox }: Todo = req.body

    const { success } = todoScheme.safeParse({ name, detail, checkbox })

    if (!success) {
        return res.status(400).json({
            msg: "not success"
        })
    }

    const userId = req.userId
    const sql = `INSERT INTO todos (name, detail, checkbox, userId) VALUES (?,?,?,?)`
    await mydb.query(sql, [name, detail, checkbox, userId])
    res.status(200).json({
        msg: "todo created"
    })
}

export const Update = async (req: Request, res: Response) => {
    const id = Number(req.query.id)

    const { name, detail, checkbox }: Todo = req.body

    const { success } = todoScheme.safeParse({ name, detail, checkbox })

    if (!success) {
        return res.status(400).json({
            msg: "not success"
        })
    }
const userId = req.userId
    const todoToUpdate = await mydb.query(`UPDATE todos SET name=?,detail=?,checkbox=?,userId=? WHERE id=?`, [name, detail, checkbox, userId, id])

      res.status(200).json({
        msg: "todo updated "
    })
}

export const Delete = async (req: Request, res: Response) => {
    const id= Number(req.query.id)

    await mydb.query(`DELETE FROM todos WHERE id=?`, [id])

    res.status(200).json(
        {
            msg: "deleted"
        }
    )
}