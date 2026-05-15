import {pool} from "./../db/db.js"

export function postController(req, res){
    res.json({recived: req.body})
}

export async function getController(req, res){
    const result = await pool.query("SELECT NOW()")
    res.json(result.rows)
}

