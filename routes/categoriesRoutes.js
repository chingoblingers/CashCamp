import express from "express"
import { createCategory } from "../controllers/categoriesController.js"

const categoriesRouter = express.Router({ mergeParams: true })

categoriesRouter.post("/" , createCategory)

export default categoriesRouter