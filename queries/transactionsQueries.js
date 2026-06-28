import { pool } from "../db/db.js";

export async function createTransaction(userId, accId, catId, amount, desc){
const {rows} = await pool.query("INSERT INTO transactions (user_id, account_id, category_id, amount, description) VALUES ($1,$2,$3,$4,$5) RETURNING *", [userId,accId,catId,amount,desc])
return rows[0]
}
