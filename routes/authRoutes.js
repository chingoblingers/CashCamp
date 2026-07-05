import { handleSignup } from "../controllers/authController.js";
import express from "express"

const authRouter = express.Router()

authRouter.post("/signup", handleSignup)

export default authRouter