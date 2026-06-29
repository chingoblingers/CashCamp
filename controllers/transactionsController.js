import { createTransaction, readAtransaction, readAllTransactions, updateTran, deletetran } from "../queries/transactionsQueries.js";

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

export async function getATransaction(req, res){
    try{
    const {userId, accountId, transactionId} = req.params
    const transaction = await readAtransaction(userId,accountId,transactionId)
    if(!transaction){
        return res.status(404).json({message: "unable to find transaction"})
    }
    res.status(200).json({transaction: transaction})
    }catch{
    res.status(500).json({error: error.message})
    console.error(error)
    }
}

export async function getAllTransactions(req, res){
try{
    const {userId, accountId} = req.params
    const transactions = await readAllTransactions(userId,accountId)
    if(transactions.length === 0){
        return res.status(200).json({message: "unable to find any transactions"})
    }
    res.status(200).json({transaction: transactions})
    }catch{
    res.status(500).json({error: error.message})
    console.error(error)
    }
}

export async function updateTransaction(req, res){
    try{
    const {userId, accountId, transactionId} = req.params
    const {amount, description} = req.body
    const transaction = await updateTran(amount,desc,userId,accountId,transactionId)
    if(!transaction){
        return res.status(404).json({message: "unable to find that transaction for updating"})
    }
    res.status(200).json({updated: transaction})
    }catch(error){
    res.status(500).json({error: error.message})
    console.error(error)    
    }
}

export async function deleteTransaction(req, res){
try{
const {userId, accountId, transactionId} = req.params
const deleted = await deletetran(userId,accountId,transactionId)
if(!deleted){
    return res.status(404).json({message: "could not find transaction to delete"})
}
res.status(200).json({deleted: deleted})
}catch(error){
    res.status(500).json({error: error.message})
    console.error(error)
}
}