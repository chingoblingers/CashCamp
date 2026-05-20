import express from "express"
import { getAccounts } from "../controllers/accountsController.js"

const accountsRouter= express.Router()

accountsRouter.get("/", getAccounts)

export default accountsRouter