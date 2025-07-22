import express from "express";
import { signin, signup } from "../controllers/user.controller";

const userrouter = express.Router()


userrouter.post("/signup", signup);
userrouter.post("/signin", signin);

export default userrouter


