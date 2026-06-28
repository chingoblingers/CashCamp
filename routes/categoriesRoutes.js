import express from "express"
import { createCategory, getUserCatergories, updateCategory } from "../controllers/categoriesController.js"

const categoriesRouter = express.Router({ mergeParams: true })

categoriesRouter.post("/" , createCategory)
categoriesRouter.get("/", getUserCatergories)
categoriesRouter.put("/", updateCategory)

export default categoriesRouter