import { testQuery } from "../queries/testQueries.js"

export function postController(req, res){
    res.json({recived: req.body})
}

export async function getController(req, res){
    try{
    const databaseTime = await testQuery()
    res.json(databaseTime)
    }catch(error){
        res.status(500).json({error : error.message})
        console.error(error)
    }

}

