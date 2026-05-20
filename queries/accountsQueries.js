import { pool } from "../db/db.js";

export async function getUserAccounts(id){
    const {rows} = pool.query("SELECT * FROM accounts WHERE id = $1", [id])
    return rows
}