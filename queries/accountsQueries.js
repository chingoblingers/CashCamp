import { pool } from "../db/db.js";

export async function getUserAccounts(id){
    const {rows} = pool.query("SELECT * FROM accounts WHERE user_id = $1", [id])
    return rows
}

export async function createSingleAccount(id, name, type, balance){
    const {rows} = await pool.query("INSERT INTO accounts (user_id, account_name, account_type, starting_balance) VALUES ($1,$2,$3,$4) RETURNING *", [id, name, type, balance])
    return rows[0]
}