import { getUsers, createUser } from "../queries/usersQueries.js";

export async function getAllUsers(req, res){
try{
const allUsers = await getUsers()
res.json({users: allUsers})
}catch(error){
res.status(500).json({error: error.message})
console.error(error)
}
    
}

export async function createNewUser(req, res){
    try{
    const {name, email}= req.body    
    const newUser = await createUser(name, email)
    res.status(201).json({user: newUser})
    }catch(error){
    console.error(error)
    res.status(500).json({error: error.message})
    }
    
}