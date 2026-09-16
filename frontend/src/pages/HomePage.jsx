import { Link } from "react-router-dom";

export default function HomePage(){
    return(
        <div className="homePage">
            <div className="homeContent">
                <h1>CashCamp</h1>
                <h3>Guide your wealth to the peak!</h3>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}