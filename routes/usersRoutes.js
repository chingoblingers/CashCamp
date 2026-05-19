import express from "express"
import { getAllUsers, createNewUser, getUser, updateUser,deleteUser } from "../controllers/usersController.js"

const usersRouter = express.Router()

usersRouter.get("/", getAllUsers)
usersRouter.post("/", createNewUser)
usersRouter.get("/:id", getUser)
usersRouter.put("/:id", updateUser)
usersRouter.delete("/:id", deleteUser)

export default usersRouter