import { getAccountSummary } from "../queries/summaryQueries.js";

export async function HandleAccountSummary(req, res){
    try{
    const {userId, accountId} = req.params
    const accountSummary = await getAccountSummary(userId, accountId)
    if(!accountSummary){
        return res.status(404).json({message: "unable to find account for summary"})
    } 
    res.status(200).json({summary: accountSummary})
    }catch(error){
        console.error(error)
        res.status(500).json({error: error.message})
    }
}