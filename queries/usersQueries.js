import { pool } from "./../db/db.js"

export async function createUser(name, email) {
  const {rows} = await pool.query(
    `INSERT INTO users (name, email)
     VALUES ($1, $2)
     RETURNING *`,
    [name, email]
  )

  return rows[0]
}

export async function getUsers(){
    const {rows} = await pool.query("SELECT * FROM users")
    return rows
}