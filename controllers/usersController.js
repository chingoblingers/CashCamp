import { getUsers } from "../queries/usersQueries";

export async function getAllUsers(req, res){
try{
const allUsers = await getUsers()
res.json({users: allUsers})
}catch(error){
res.status(500).json({error: error.message})
console.error(error)
}
    
}