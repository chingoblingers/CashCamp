import express from "express"
import { getAccounts, createAccount,updateAccount,deleteAccount } from "../controllers/accountsController.js"
import { requireAuth } from "../middleware/requireAuth.js"

const accountsRouter = express.Router({ mergeParams: true })

accountsRouter.get("/", requireAuth, getAccounts)
accountsRouter.post("/", requireAuth, createAccount)
accountsRouter.put("/:accountId", updateAccount)
accountsRouter.delete("/:accountId", deleteAccount)

export default accountsRouter