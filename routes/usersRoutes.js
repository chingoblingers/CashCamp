import express from "express"
import { getAllUsers, createNewUser, getUser } from "../controllers/usersController.js"

const usersRouter = express.Router()

usersRouter.get("/", getAllUsers)
usersRouter.post("/", createNewUser)
usersRouter.get("/:id", getUser)

export default usersRouter