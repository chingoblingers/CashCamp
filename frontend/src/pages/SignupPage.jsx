import {Link, useNavigate} from 'react-router-dom'
import {useState} from 'react'
import {signupUser} from './../api/authApi.js'

export default function SignupPage(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

   async function handleSubmit(e){
        e.preventDefault()
        setError("")
     const data = await signupUser(name, email, password)
    if(!data.user){
    setError(data.message || "Signup Failed")
    return
    } 
    navigate("/login")
    }

    return (
        <div className='signupPage'>
        <h1> Sign up here to create your account! </h1>
        <Link to="/login"> click here to login if you have an account already! </Link>
        <form onSubmit={handleSubmit}>
        <label htmlFor="signupName">Name</label>    
        <input type="text" name="name" id="signupName" placeholder="Tyler" required onChange={(e)=>setName(e.target.value)} value={name}/>
        <label htmlFor="signupEmail">Email</label>
        <input type="email" name="email" id="signupEmail" placeholder="tyler@emailsite.com" required onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <label htmlFor="signupPassword">Password</label>
        <input type="password" name="password" id="signupPassword" placeholder="Password123" required onChange={e=>setPassword(e.target.value)} value={password}/>
        <button type="submit"> Submit </button>
        {error && <p>{error}</p>}
        </form>    
        </div>
    )
}