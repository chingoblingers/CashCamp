import { handleSignup, handleLogin } from "../controllers/authController.js";
import express from "express"

const authRouter = express.Router()

authRouter.post("/signup", handleSignup)
authRouter.post("/login", handleLogin)

export default authRouter