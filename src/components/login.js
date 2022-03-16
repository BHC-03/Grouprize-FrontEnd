import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope,faLock,faUser} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import {userInfoAtom,gettingUserinfoAtom} from '../RecoilStuff/index';
import { useSetRecoilState,useRecoilState } from "recoil";


function LoginForm(){
    const [userInfo,setUserInfo] = useRecoilState(gettingUserinfoAtom);
    const setSignedUserInfo = useSetRecoilState(userInfoAtom);
    function loginSubmitHandler(){
        axios.post('http://127.0.0.1:8000/users/login/',
        {
            email:userInfo.email,
            password:userInfo.password,
            name:userInfo.username
        }).then(
            data=>{
                setSignedUserInfo(data.data);
                window.sessionStorage.setItem('userInfo',JSON.stringify(data.data))
            }
        )
    }
    function emailHandler(e){
        setUserInfo({...userInfo,email:e.target.value})
    }
    function passwordHandler(e){
        setUserInfo({...userInfo,password:e.target.value})
    }
    function usernameHandler(e){
        setUserInfo({...userInfo,username:e.target.value})
    }
    return (
        <div className="loginForm">
           <div className="registerInputContainer">
                    <div className="textInputContainer">
                        <FontAwesomeIcon icon={faEnvelope} className="inputIcon emailIcon" />
                        <input type="text" value={userInfo.email} onChange={emailHandler} className="textInput emailInput" />
                    </div>
                    <div className="textInputContainer">
                        <FontAwesomeIcon icon={faLock} className="inputIcon passwordIcon" />
                        <input value={userInfo.password} onChange={passwordHandler} type="password" className="textInput passwordInput"/>
                    </div>
                    <div className="textInputContainer">
                        <FontAwesomeIcon icon={faUser} className="inputIcon usernameIcon" />
                        <input  value={userInfo.username} onChange={usernameHandler} type="text"className="textInput usernameInput" />
                    </div>
                </div>
            <Link to={'/mainpage/membership'}><p onClick={loginSubmitHandler} className="button loginSubmit">
                Login
            </p>
            </Link>
            <p className="registerP">you don't have an account ? <Link to={'/register/'}><a href="#drg" className="registerA">Register</a></Link></p>
        </div>
    )
}


export default LoginForm;