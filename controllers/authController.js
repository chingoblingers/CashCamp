import { createUser, findUserByEmail } from "../queries/authQueries.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

export async function handleLogin(req, res){
    try{
    const {email, password} = req.body
    if (!email || !password){
        return res.status(400).json({message: "missing a required field"})
    }
    const user = await findUserByEmail(email)
    if(!user){
        return res.status(401).json({message: "Invalid email or password"})
    }
    const {password_hash} = user
    const isValid = await bcrypt.compare(password, password_hash)
    if(!isValid){
        return res.status(401).json({message: "Invalid email or password"})
    }
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"})
    const verifiedUser = {id: user.id, name: user.name, email: user.email}
    res.status(200).json({token, user: verifiedUser })
    }catch(error){
        console.error(error)
        res.status(500).json({error: error.message})
    }
}