import React from "react";
import { Link } from "react-router-dom";
const HomePage =()=>{
    return(
        <div className="homePageContainer">
            <h3 className="helloHomePage">Hello There</h3>
            <p className="discreption">Lorem ipsum dolor sit amet consectetur adipisicing elit. A, maiores sed, voluptates excepturi quis provident cum magnam dolores perferendis neque dolorem? Corporis iure aliquid labore eaque velit adipisci animi sunt!</p>
            <div className="homePageButtons">
                <Link to={'/register/'}>
                    <a className="button registerHomeButton">Register</a>
                </Link>
                <Link to={'/login/'}>
                    <a className="button loginHomeButton">Login</a>
                </Link>
                
            </div>
        </div>

    )
}


export default HomePage;