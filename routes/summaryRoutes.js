import express from "express"
import { handleAccountSummary, handleUserSummary } from "../controllers/summaryController.js"
import { requireAuth } from "../middleware/requireAuth.js"

const summaryRouter = express.Router({mergeParams: true})

summaryRouter.get("/summary", handleUserSummary)
summaryRouter.get("/accounts/:accountId/summary", handleAccountSummary)

export default summaryRouter