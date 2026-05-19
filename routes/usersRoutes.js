import express from "express"
import { getAllUsers, createNewUser, getUser, updateUser } from "../controllers/usersController.js"

const usersRouter = express.Router()

usersRouter.get("/", getAllUsers)
usersRouter.post("/", createNewUser)
usersRouter.get("/:id", getUser)
usersRouter.put("/:id", updateUser)

export default usersRouter