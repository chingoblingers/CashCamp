import express from "express"
import { handleAccountSummary } from "../controllers/summaryController.js"

const summaryRouter = express.Router({mergeParams: true})

summaryRouter.get("/", handleAccountSummary)

export default summaryRouter