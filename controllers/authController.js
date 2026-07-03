import { createUser } from "../queries/authQueries.js";
import bcrypt from 'bcrypt'

export async function handleSignup(req, res){
    try{
    const {name, email, password} = req.body
    if (!name || !email || !password){
        return res.status(400).json({message: "missing a requried field"})
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = await createUser(name, email, passwordHash)
    if (!newUser){
        return res.status(400).json({message: "unable to create user"})
    } 
    res.status(201).json({user: newUser})
    }catch(error){
    if (error.code === "23505") {
    return res.status(409).json({ message: "email already exists" })
    }    
        console.error(error)
        res.status(500).json({error: error.message})
    }
}

