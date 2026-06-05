import { getUserAccounts,createSingleAccount,updateUserAccount,deleteAcc } from "../queries/accountsQueries.js";

export async function getAccounts(req, res){
 try{
 const {id} = req.params
 const userAccounts = await getUserAccounts(id)
 if (!userAccounts){
    return res.status(404).json({error: "No user accounts found"})
 }
 res.status(200).json({account: userAccounts})
 }catch(error){
 console.error(error)
 res.status(500).json({error: error.message})
 }  

}

export async function createAccount(req, res) {
    try{
    const {userId} = req.params
    const {account_name, account_type, starting_balance} = req.body
    const newAccount = await createSingleAccount(userId,account_name,account_type,starting_balance)
    res.status(200).json({message: `successfully created account ${account_name}`, account: newAccount})
    }catch(error){
    console.log(error)
    res.status(500).json({error: error.message})
    }
    
}

export async function updateAccount(req, res){
    try {
    const {userId, accountId} = req.params
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
        const {user_id, id} = req.body
      const deletedAccount = await deleteAcc(user_id,id)
        if(!deletedAccount){
         return  res.status(404).json({message: "No account of that name exists to be deleted"})
        }
        res.status(200).json({message: "account has been deleted."})
        
    }catch(error){
    res.status(500).json({error: error.message})
    console.error(error)
    }
    


}