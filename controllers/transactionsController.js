import { createTransaction } from "../queries/transactionsQueries.js";

export async function insertTransaction(req, res){
    try{
    const {userId, accountId} = req.params
    const {amount, desc, categoryId } = req.body
    const newTransaction = await createTransaction(userId,accountId,categoryId,amount,desc)
    if(!newTransaction){
        return res.status(404).json({messege: "unable to create transaction"})
    }
    res.status(200).json({transaction: newTransaction})
    }catch(error){
    res.status(500).json({error: error.message})
    console.error(error)
    }
}