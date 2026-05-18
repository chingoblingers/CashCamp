import fs from "node:fs/promises"
import path from "node:path"
import { pool } from "./db.js"

const __dirname = import.meta.dirname
const usersSql = path.join(__dirname, "../sql", "users.sql")
const accountsSql = path.join(__dirname, "../sql", "accounts.sql")
const categoriesSql = path.join(__dirname, "../sql", "categories.sql")
const transactionsSql = path.join(__dirname, "../sql", "transactions.sql")
const sqlFiles = [usersSql,accountsSql,categoriesSql,transactionsSql]

async function runSchema(){

try{
 for (let file of sqlFiles) {
    const sql = await fs.readFile(file, "utf-8")
    await pool.query(sql)
    console.log(`${file} executed successfully`)
  }
}catch(error){
console.error(`unable to read file due to error: ${error}`)
}finally{
 await pool.end()
 console.log("Schema executed successfully")
}    
}

runSchema()

