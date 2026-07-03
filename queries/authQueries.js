import { pool } from "../db/db.js";

export async function createUser(name, email, passwordHash){
    const {rows} = await pool.query(`INSERT into users (name, email, password_hash) VALUES($1, $2, $3) RETURNING id, name, email`, [name, email, passwordHash])
    return rows[0]
}