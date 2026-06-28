import express from "express"
import { insertTransaction } from "../controllers/transactionsController.js"

const transactionsRouter = express.Router({mergeParams: true})

transactionsRouter.post("/", insertTransaction)

export default transactionsRouter