import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope,faLock,faArrowRight,faUser} from "@fortawesome/free-solid-svg-icons";

const RegisterForm = ()=>{
    const [registerStep2,setRegisterStep2] = useState(false);
    function nextHandler(){
        setRegisterStep2(true)
    }
    let registerFormStyling;
    let interestFormStyling;
    if(registerStep2){
        registerFormStyling ={
            transform:  'translate(-150%,-50%)'
        }
        interestFormStyling={
            transform:  'translate(-50%,-50%)'
        }
    }else{
        registerFormStyling ={
            transform:  'translate(-50%,-50%)'
        }
        interestFormStyling={
            transform:  'translate(50%,-50%)'
        }
    }
    return(
        <div className="regisetAndInterestsForm">
            <div className="registerForm" style={registerFormStyling}>
                <div className="registerInputContainer">
                    <div className="textInputContainer">
                        <FontAwesomeIcon icon={faEnvelope} className="inputIcon emailIcon" />
                        <input type="text" className="textInput emailInput" />
                    </div>
                    <div className="textInputContainer">
                        <FontAwesomeIcon icon={faLock} className="inputIcon passwordIcon" />
                        <input type="text" className="textInput passwordInput"/>
                    </div>
                    <div className="textInputContainer">
                        <FontAwesomeIcon icon={faUser} className="inputIcon usernameIcon" />
                        <input type="text"className="textInput usernameInput" />
                    </div>
                </div>
                <a onClick={nextHandler} className="button registerButton">
                    <FontAwesomeIcon className="nextArrow" icon={faArrowRight} />
                </a>
            </div>
            <div className="interestsForm" style={interestFormStyling}>
                <a className="button interest">Programming</a>
                <a className="button interest">Web Dev</a>
                <a className="button interest">Android</a>
                <a className="button interest">Drawing</a>
                <a className="button interest">Anime</a>
                <a className="button interest">Movies</a>
                <a className="button interest">Tv Shows</a>
                <a className="button registerSubmitButton">Register</a>
            </div>
        </div>
    )
}

export default RegisterForm