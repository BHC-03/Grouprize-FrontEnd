import React , {useState} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope,faLock,faUser} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import {userInfoAtom,gettingUserinfoAtom} from '../RecoilStuff/index';
import { useSetRecoilState,useRecoilState } from "recoil";
import useForm from "./Test/useForm";
import { useHistory } from "react-router-dom";

function LoginForm(){
    const history = useHistory();
    const [userInfo,setUserInfo] = useRecoilState(gettingUserinfoAtom);
    const setSignedUserInfo = useSetRecoilState(userInfoAtom);
    const [errors,setErrors] = useForm(userInfo);
    const [isGood,setIsGood] = useState(true);
    function loginSubmitHandler(){
        if(errors.email || errors.password){
            return setIsGood(false);
        }
        axios.post('http://127.0.0.1:8000/users/login/',
        {
            email:userInfo.email,
            password:userInfo.password,
            name:userInfo.username
        }).then(
            data=>{
                
                setSignedUserInfo(data.data);
                window.sessionStorage.setItem('userInfo',JSON.stringify(data.data))
                history.push('/mainpage/membership');
            }
        ).catch(err=>{
            setErrors(olderror=>({...olderror,email:'Please enter your email correctly',password:'please Enter your Password correctly'}))
        })
    }
    function emailHandler(e){
        setUserInfo({...userInfo,email:e.target.value})
    }
    function passwordHandler(e){
        setUserInfo({...userInfo,password:e.target.value})
    }
    return (
        <div className="loginForm">
           <div className="loginInputsContainer">
                    <div className="textInputContainer">
                        <FontAwesomeIcon icon={faEnvelope} className="inputIcon emailIcon" />
                        <input type="text" value={userInfo.email} onChange={emailHandler} className="textInput emailInput" />
                        
                    </div>
                    {!isGood && errors.email && (
                            <p className="errorMessage">{errors.email}</p>
                        )}
                    <div className="textInputContainer">
                        <FontAwesomeIcon icon={faLock} className="inputIcon passwordIcon" />
                        <input value={userInfo.password} onChange={passwordHandler} type="password" className="textInput passwordInput"/>
                        
                    </div>
                    {!isGood && errors.password && (
                            <p className="errorMessage">{errors.password}</p>
                        )}
                    
                </div>
            <p onClick={loginSubmitHandler} className="button loginSubmit">
                Login
            </p>
            
            <p className="registerP">you don't have an account ? <Link to={'/register/'}><a href="#drg" className="registerA">Register</a></Link></p>
        </div>
    )
}


export default LoginForm;