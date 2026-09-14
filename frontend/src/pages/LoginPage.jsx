import {Link} from 'react-router-dom'
import { useState } from 'react'
import { loginUser } from '../api/authApi.js'

export default function LoginPage(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    
   async function handleSubmit(e){
        try{
            e.preventDefault()
            const data = await loginUser(email, password)
            if (!data.token){
                setError(data.message|| "Login Failed")
                return
            }
            console.log(data)

        }catch(error){

        }
        
        
    }
    
    return (
        <>
        <header>
            <h1>Welcome to CashCamp, the world's best finance tracker!</h1>
        </header>
        <main>
            <Link to="/signup">Click here if you don't have an account!</Link>
            <form onSubmit={handleSubmit}>
                <label htmlFor='loginEmail'>Email:</label>
                <input type='email' id='loginEmail' name='email' placeholder='yamir@gmail.com' value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <label htmlFor='loginPass'>Password:</label>
                <input type='password' id='loginPass' name='password' value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <button type='submit'> Login </button> 
            </form>
            {error && <p>{error}</p>}   
        </main>
        </>
    )
}