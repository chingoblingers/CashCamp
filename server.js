import express from "express"
import TestRouter from "./routes/testRoutes.js"
import UsersRouter from "./routes/usersRoutes.js"
import AccountsRouter from "./routes/accountsRoutes.js"
import CategoriesRouter from "./routes/categoriesRoutes.js"
import TransactionsRouter from "./routes/transactionsRoutes.js"
import SummaryRouter from "./routes/summaryRoutes.js"
import AuthRouter from "./routes/authRoutes.js"
import { requireAuth } from "./middleware/requireAuth.js"
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors({origin: "http://localhost:5173"}))
app.use(express.json())
app.use("/test", TestRouter)
app.use("/users", UsersRouter)
app.use("/me/accounts", requireAuth, AccountsRouter)
app.use("/me/categories", requireAuth, CategoriesRouter)
app.use("/me/accounts/:accountId/transactions", requireAuth, TransactionsRouter)
app.use("/me", requireAuth, SummaryRouter)
app.use("/auth", AuthRouter)

app.listen(PORT, () => {
  console.log(`running on PORT:${PORT} successfully`)
})