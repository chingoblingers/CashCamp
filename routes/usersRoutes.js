import express from "express"
import { getAllUsers, createNewUser } from "../controllers/usersController.js"

const usersRouter = express.Router()

usersRouter.get("/", getAllUsers)
usersRouter.post("/", createNewUser)

export default usersRouter