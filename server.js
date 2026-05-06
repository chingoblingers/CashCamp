import express from "express"

const app = express()
const PORT = 8000

app.get("/test", (req, res) => {
  res.json({ message: "CashCamp backend running" })
})

app.listen(PORT, () => {
  console.log(`running on PORT:${PORT} successfully`)
})