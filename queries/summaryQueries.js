import { pool } from "../db/db.js";

export async function getAccountSummary(userId, accountId){
    const {rows} = await pool.query(
        `SELECT a.id, a.account_name, a.account_type, a.starting_balance,

        COALESCE(SUM(CASE 
        WHEN c.kind = 'income' THEN t.amount
        ELSE 0
        END),0) AS total_income,
        
        COALESCE(SUM(CASE 
        WHEN c.kind = 'expense' THEN t.amount
        ELSE 0
        END),0) AS total_expense,

        a.starting_balance +
        COALESCE(SUM(CASE
        WHEN c.kind = 'expense' THEN -t.amount
        WHEN c.kind = 'income' THEN t.amount
        ELSE 0 
        END),0) AS current_balance 
          FROM accounts a
        LEFT JOIN transactions t ON a.id = t.account_id
        LEFT JOIN categories c ON t.category_id = c.id
        WHERE a.user_id = $1 AND a.id = $2 
        GROUP BY a.id, a.account_name, a.account_type, a.starting_balance;
        `, [userId, accountId]
    )

    return rows[0]
}