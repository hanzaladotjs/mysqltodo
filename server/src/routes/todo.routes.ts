import express from "express";

import { Add, Delete, getTodos, Update } from "../controllers/todo.controller";

import authMiddleware from "../middlewares/auth";

const todorouter = express.Router()

todorouter.get("/todos",authMiddleware ,getTodos)
todorouter.post("/add", authMiddleware, Add);
todorouter.put("/update", authMiddleware, Update)
todorouter.delete("/delete", authMiddleware, Delete)




export default todorouter