import express from "express"
import { getAccounts, createAccount,updateAccount,deleteAccount } from "../controllers/accountsController.js"

const accountsRouter = express.Router({ mergeParams: true })

accountsRouter.get("/", getAccounts)
accountsRouter.post("/", createAccount)
accountsRouter.put("/:accountId", updateAccount)
accountsRouter.delete("/:accountId", deleteAccount)

export default accountsRouter