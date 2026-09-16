import { Link } from "react-router-dom";

export default function HomePage(){
    return(
        <div className="homePage">
            <div className="homeContent">
                <div className="homeHeader">
                    <h1>CashCamp</h1>
                    <h3>Guide your wealth to the peak!</h3> 
                </div>
                <div className="homeButtons">
                    <Link to="/login" className="homeBtn">Login</Link>
                    <Link to="/signup" className="homeBtn">Sign Up</Link>
                </div>

            </div>
        </div>
    )
}