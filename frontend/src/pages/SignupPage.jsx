import {Link} from 'react-router-dom'
import {useState} from 'react'

export default function SignupPage(){
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(e){
        e.preventDefault()
        console.log({ name, email, password })
    }

    return (
        <>
        <h1> Sign up here to create your account! </h1>
        <Link to="/login"> click here to login if you have an account already! </Link>
        <form onSubmit={handleSubmit}>
        <label htmlFor="signupName">Name</label>    
        <input type="text" name="name" id="signupName" placeholder="Tyler" required onChange={(e)=>setName(e.target.value)} value={name}/>
        <label htmlFor="signupEmail">Email</label>
        <input type="email" name="signupEmail" id="email" placeholder="tyler@emailsite.com" required onChange={(e)=>setEmail(e.target.value)} value={email}/>
        <label htmlFor="signupPassword">Password</label>
        <input type="password" name="signupPassword" id="password" placeholder="Password123" required onChange={e=>setPassword(e.target.value)} value={password}/>
        <button type="submit"> Submit </button>
        </form>    
        </>
    )
}