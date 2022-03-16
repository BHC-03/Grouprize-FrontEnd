import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope,faLock,faArrowRight,faUser,faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import InterestElement from "./interestelement";
import {userInfoAtom,gettingUserinfoAtom} from '../RecoilStuff/index';
import {useSetRecoilState,useRecoilState } from "recoil";

const RegisterForm = ({})=>{
    const [userInfo,setUserInfo] = useRecoilState(gettingUserinfoAtom);
    const setSignedUserInfo = useSetRecoilState(userInfoAtom);
    const [interestsIds,setInterestsIds] = useState([]);
    const [interestList,setInterestList] = useState([]);
    const [registerStep2,setRegisterStep2] = useState(false);
    async function nextHandler(){
        await axios.get('http://127.0.0.1:8000/interests/').then(
            data=>{
                setInterestList(data.data)
                setInterestsIds([]);
                setRegisterStep2(!registerStep2)
            }
        )
        
    }
     function registerSubmitHandler(){
        axios.post('http://127.0.0.1:8000/users/',{email:userInfo.email,name:userInfo.username,password:userInfo.password}).then(async data=>{
            setSignedUserInfo(data.data)
            let tempdata = data.data;
            
            axios.post('http://127.0.0.1:8000/interests/subscribe/'
            ,{id:[...interestsIds]},{headers:{
                Authorization:`Bearer ${tempdata.token}`
            }}
            )
            
            

        })
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
                <p onClick={nextHandler} className="button registerButton">
                    <FontAwesomeIcon className="nextArrow" icon={faArrowRight} />
                </p>
                <p className="registerP loginP"> you already have an account ? <Link to={'/login/'}><a href="#asdas" className="registerA">LogIn</a></Link> </p>
            </div>
            <div className="interestsForm" style={interestFormStyling}>
                {
                    interestList.map(interest=>{
                        return (
                            <InterestElement key={interest.id} interestsIds={interestsIds} setInterestsIds={setInterestsIds} interest={interest} />
                        )
                    })
                }
                <Link to={'/mainpage/'}><p onClick={registerSubmitHandler} className="button registerSubmitButton">Register</p></Link>
                <p  onClick={nextHandler} className="button registerBackButton"><FontAwesomeIcon className="arrowBack" icon={faArrowLeft}/></p>
                <p className="registerP loginP"> you already have an account ? <Link to={'/login/'}><a href="#af" className="registerA">LogIn</a></Link> </p>
            </div>
            
        </div>
    )
}

export default RegisterForm