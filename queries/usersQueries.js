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

export async function getSingleUser(id){
 const {rows} = await pool.query("SELECT * FROM users WHERE id = $1", [id])
 return rows[0]
}

export async function updateSingleUser(name, email, id){
  const {rows} = await pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *", [name,email,id])
  return rows[0]
}