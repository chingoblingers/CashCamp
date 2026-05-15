import {pool} from "./../db/db.js"

export async function testQuery(){
    const result = await pool.query("SELECT NOW()")
}