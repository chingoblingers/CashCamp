import { getUsers, createUser, getSingleUser, updateSingleUser, deleteSingleUser } from "../queries/usersQueries.js";

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

export async function updateUser(req, res){
    try{
    const {name, email} = req.body
    const {id} = req.params
    const updatedUser = await updateSingleUser(name,email,id)
    if (!updatedUser){
        return res.status(404).json({error: "No user found to update"})
    }
     res.status(200).json({user: updatedUser})
    }catch(error){
    console.error(error)
    res.json({error: error.message})
    }
}

export async function deleteUser(req, res){
try{
const {id} = req.params
const deletedUser = await deleteSingleUser(id)
if (!deletedUser){
    return res.status(404).json({error: "unable to delete user"})
}
res.status(200).json({message: "User deleted successfully", user: deletedUser})
}catch(error){
console.error(error)
res.json(500).json({error: error.message})    
}

}