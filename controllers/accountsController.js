import { getUserAccounts,createSingleAccount,updateUserAccount,deleteAcc } from "../queries/accountsQueries.js";

export async function getAccounts(req, res){
 try{
 const userId = req.user.id
 const userAccounts = await getUserAccounts(userId)
 if (!userAccounts){
    return res.status(200).json([])
 }
 res.status(200).json({account: userAccounts})
 }catch(error){
 console.error(error)
 res.status(500).json({error: error.message})
 }  

}

export async function createAccount(req, res) {
    try{
    const userId = req.user.id
    const {account_name, account_type, starting_balance} = req.body
    const newAccount = await createSingleAccount(userId,account_name,account_type,starting_balance)
    res.status(201).json({message: `successfully created account ${account_name}`, account: newAccount})
    }catch(error){
    console.log(error)
    res.status(500).json({error: error.message})
    }
    
}

export async function updateAccount(req, res){
    try {
    const userId = req.user.id    
    const {accountId} = req.params
    const {account_name, account_type, starting_balance} = req.body
    const updatedAccount = await updateUserAccount(account_name,account_type,starting_balance,userId,accountId)
    if(!updatedAccount){
    return  res.status(404).json({message: "No such account to update"})
    }
    res.status(200).json({message:`Updated account ${account_name} successfully`, user: updatedAccount})
    } catch (error) {
      console.error(error)
      res.status(500).json({error: error.message})  
    }
}

export async function deleteAccount(req, res){
    try{
        const userId = req.user.id
        const {id} = req.body
      const deletedAccount = await deleteAcc(userId,id)
        if(!deletedAccount){
         return  res.status(404).json({message: "No account of that name exists to be deleted"})
        }
        res.status(200).json({message: "account has been deleted."})
        
    }catch(error){
    res.status(500).json({error: error.message})
    console.error(error)
    }
    


}