import express from "express"
import { getAccounts, createAccount } from "../controllers/accountsController.js"

const accountsRouter= express.Router({ mergeParams: true })

accountsRouter.get("/", getAccounts)
accountsRouter.post("/", createAccount)

export default accountsRouter