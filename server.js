import express from "express"
import TestRouter from "./routes/testRoutes.js"
import UsersRouter from "./routes/usersRoutes.js"

const app = express()
const PORT = 8000

app.use(express.json())
app.use("/test", TestRouter)
app.use("/users", UsersRouter)

app.listen(PORT, () => {
  console.log(`running on PORT:${PORT} successfully`)
})