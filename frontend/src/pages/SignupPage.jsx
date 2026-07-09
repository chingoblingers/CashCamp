import {Link} from 'react-router-dom'

export default function SignupPage(){
    return (
        <>
        <h1> Sign up here to create your account! </h1>
        <Link to="/login"> click here to login if you have an account already! </Link>
        </>
    )
}