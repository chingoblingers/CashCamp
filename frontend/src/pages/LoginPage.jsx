import {Link} from 'react-router-dom'

export default function LoginPage(){
    return (
        <>
        <h1>Welcome to CashCamp, the world's best finance tracker!</h1>
        <Link to="/signup">Click here if you don't have an account!</Link>
        </>
    )
}