import { pool } from "../db/db.js";

export async function getUserAccounts(id){
    const {rows} = pool.query("SELECT * FROM accounts WHERE user_id = $1", [id])
    return rows
}

export async function createSingleAccount(id, name, type, balance){
    const {rows} = await pool.query("INSERT INTO accounts (user_id, account_name, account_type, starting_balance) VALUES ($1,$2,$3,$4) RETURNING *", [id, name, type, balance])
    return rows[0]
}

export async function updateUserAccount(name, type, balance, userId, accountId) {
  const { rows } = await pool.query(
    `UPDATE accounts
     SET account_name = $1, account_type = $2, starting_balance = $3
     WHERE user_id = $4 AND id = $5
     RETURNING *`,
    [name, type, balance, userId, accountId]
  )

  return rows[0]
}

export async function deleteAcc(userId, accountId){
 const { rows } = await pool.query("DELETE FROM accounts WHERE user_id = $1 AND id = $2 RETURNING *", [userId, accountId])
 return rows[0]
}