import express from "express"
import TestRouter from "./routes/testRoutes.js"
import UsersRouter from "./routes/usersRoutes.js"
import AccountsRouter from "./routes/accountsRoutes.js"
import CategoriesRouter from "./routes/categoriesRoutes.js"

const app = express()
const PORT = 8000

app.use(express.json())
app.use("/test", TestRouter)
app.use("/users", UsersRouter)
app.use("/users/:userId/accounts", AccountsRouter)
app.use("/users/:userId/categories", CategoriesRouter)

app.listen(PORT, () => {
  console.log(`running on PORT:${PORT} successfully`)
})