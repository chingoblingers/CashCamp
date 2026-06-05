import express from "express"
import { createCategory, getUserCatergories } from "../controllers/categoriesController.js"

const categoriesRouter = express.Router({ mergeParams: true })

categoriesRouter.post("/" , createCategory)
categoriesRouter.get("/", getUserCatergories)

export default categoriesRouter