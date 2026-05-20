import { getUserAccounts } from "../queries/accountsQueries.js";

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