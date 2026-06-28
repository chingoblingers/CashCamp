import express from "express"
import { insertTransaction, getATransaction, getAllTransactions } from "../controllers/transactionsController.js"

const transactionsRouter = express.Router({mergeParams: true})

transactionsRouter.post("/", insertTransaction)
transactionsRouter.get("/", getAllTransactions)
transactionsRouter.get("/:transactionId", getATransaction)

export default transactionsRouter