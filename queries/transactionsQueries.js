import { pool } from "../db/db.js";

export async function createTransaction(userId, accId, catId, amount, desc){
const {rows} = await pool.query("INSERT INTO transactions (user_id, account_id, category_id, amount, description) VALUES ($1,$2,$3,$4,$5) RETURNING *", [userId,accId,catId,amount,desc])
return rows[0]
}

export async function readAtransaction(userId,accId,transactionId){
    const {rows} = await pool.query("SELECT * FROM transactions WHERE user_id = $1 AND account_id = $2 AND id = $3",[userId, accId, transactionId])
    return rows[0]
}

export async function readAllTransactions(userId, accountId){
    const {rows} = await pool.query("SELECT * FROM transactions WHERE user_id = $1 AND account_id = $2", [userId, accountId])
    return rows
}

export async function updateTran(amount, description, userId, accountId, transId){
    const {rows} = await pool.query("UPDATE transactions SET amount = $1, description = $2 WHERE user_id = $3 AND account_id = $4 AND id = $5 RETURNING *",[amount, description, userId, accountId, transId])
    return rows[0]
}

export async function deletetran(userId, accountId, tranId){
    const {rows} = await pool.query("DELETE FROM transactions WHERE user_id = $1 AND account_id = $2 AND id = $3 RETURNING *", [userId,accountId,tranId])
    return rows[0]
}