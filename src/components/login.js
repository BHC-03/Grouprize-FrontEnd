import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope,faLock} from "@fortawesome/free-solid-svg-icons";

function LoginForm(){
    return (
        <div className="loginForm">
            <div className="loginInputsContainer">
            <div className="textInputContainer emailInputContainer">
                <FontAwesomeIcon icon={faEnvelope} className="inputIcon emailIcon"/>
                <input type="text" className="textInput loginInput" />
            </div>
            <div className="textInputContainer passwordInputContainer">
                <FontAwesomeIcon  icon={faLock} className="inputIcon passwordIcon"/>
                <input type="text" className="textInput passwordInput"/>
            </div>
            </div>
            <a className="button loginSubmit">
                Login
            </a>
        </div>
    )
}


export default LoginForm;