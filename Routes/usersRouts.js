import express from "express";
import { getUsers, postUsers, deleteUsers, putUsers, loginUser } from "../controllers/userController.js";

const userRouter = express.Router();


userRouter.get("/", getUsers);

userRouter.post("/", postUsers);

userRouter.post("/login", loginUser);

userRouter.delete("/", deleteUsers);

userRouter.put("/", putUsers);


export default userRouter;