import { pool } from "../db/db.js";

export async function createSingleCategory(id, name, kind, group){
    const {rows} = await pool.query("INSERT INTO categories (user_id, name, kind, category_group) VALUES ($1, $2, $3, $4) RETURNING *", [id,name,kind,group])
    return rows[0]
}

export async function getCategories(id){
    const {rows} = await pool.query("SELECT * FROM categories WHERE user_id = $1", [id])
    return rows
}