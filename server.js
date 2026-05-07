import express from "express"
import TestRouter from "./routes/testRoutes.js"

const app = express()
const PORT = 8000

app.use(express.json())
app.use("/test", TestRouter)

app.listen(PORT, () => {
  console.log(`running on PORT:${PORT} successfully`)
})