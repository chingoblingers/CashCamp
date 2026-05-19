import { getUsers, createUser, getSingleUser } from "../queries/usersQueries.js";

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

export async function getUser(req, res){
  try{
const {id} = req.params
const user = await getSingleUser(id)
if (!user){
 return  res.status(404).json({error: "User not found"})
}
res.status(200).json({user})
  }catch(error){
  console.error(error)
  res.status(500).json({error: error.message})  
  } 
  
}