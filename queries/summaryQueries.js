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
        END),0) AS total_expenses,

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

export async function getUserSummary(userId){
const {rows} = await pool.query(`
WITH account_summaries AS (

SELECT a.id AS account_id, a.user_id, a.account_name, a.account_type, a.starting_balance,

COALESCE(SUM(CASE 
WHEN c.kind = 'income' THEN t.amount
ELSE 0
END),0) AS total_income,

COALESCE(SUM(CASE 
WHEN c.kind = 'expense' THEN t.amount
ELSE 0
END),0) AS total_expenses,

a.starting_balance + COALESCE(SUM(CASE 
WHEN c.kind = 'income' THEN t.amount
WHEN c.kind = 'expense' THEN -t.amount
ELSE 0
END),0) AS current_balance FROM accounts a

LEFT JOIN transactions t ON a.id = t.account_id
LEFT JOIN categories c ON c.id = t.category_id
GROUP BY a.id, a.user_id, a.account_name, a.account_type, a.starting_balance

)

SELECT u.id AS user_id, COALESCE(SUM(acs.total_income), 0) AS total_income,
COALESCE(SUM(acs.total_expenses), 0) AS total_expenses, 
COALESCE(SUM(acs.current_balance),0) AS current_balance FROM users u
LEFT JOIN account_summaries acs ON u.id = acs.user_id
WHERE u.id = $1
GROUP by u.id;
    `,[userId])

    return rows[0]
}