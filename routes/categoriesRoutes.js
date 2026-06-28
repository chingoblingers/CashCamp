import express from "express"
import { createCategory, getUserCatergories, updateCategory, deleteCategory } from "../controllers/categoriesController.js"

const categoriesRouter = express.Router({ mergeParams: true })

categoriesRouter.post("/" , createCategory)
categoriesRouter.get("/", getUserCatergories)
categoriesRouter.put("/:categoryId", updateCategory)
categoriesRouter.delete("/:categoryId", deleteCategory)

export default categoriesRouter