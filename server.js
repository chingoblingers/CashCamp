import express from "express"

const app = express()
const PORT = 8000

app.use(express.json())

app.post("/test", (req, res)=>{
  res.json({recived: req.body})
})

app.get("/test", (req, res) => {
  res.json({ message: "CashCamp backend running" })
})

app.listen(PORT, () => {
  console.log(`running on PORT:${PORT} successfully`)
})