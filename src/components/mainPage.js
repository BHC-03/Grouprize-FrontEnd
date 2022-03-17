import React from "react";
import { BrowserRouter as Router,Switch,Route } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass,faHome} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MainPageMembership from "./MainPageMembership";
import MainPageExplore from "./MainPageExplore";
import LoginForm from "./login";
import { useRecoilState } from "recoil";
import styled from 'styled-components';
import { motion } from "framer-motion";
import { userInfoAtom } from "../RecoilStuff/index";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

const MainPage = ()=>{
    const  [signedUserInfo,setSignedUserInfo] = useRecoilState(userInfoAtom);
    const {pathname} = useLocation();
    const history = useHistory();
    if(!signedUserInfo.token){
        if(window.sessionStorage.getItem('userInfo')){
            setSignedUserInfo(JSON.parse(sessionStorage.getItem('userInfo')))
        }else{
            return history.push('/login/');
        }
    }
   
    return (
        <div className="mainPageContainer">
            <div className="Nav">
                
                <div className="mainPageIconContainer">
                    <ActiveDiv initial={{width:'0%'}} animate={{width:pathname=='/mainpage/membership'?'60px':'0%' , transition:{
                        duration:0.4
                    }}} />
                    <Link to={'/mainpage/membership'}>
                        <FontAwesomeIcon className="homeIcon mainPageIcon " icon={faHome} />
                    </Link>
                    
                </div>
                
                <div className="mainPageIconContainer">
                    <ActiveDiv initial={{width:'0%'}} animate={{width:pathname=='/mainpage/explore/'?'60px':'0%' , transition:{
                        duration:0.4
                    }}} />
                    <Link to={'/mainpage/explore/'}>
                        <FontAwesomeIcon className="exploreIcon mainPageIcon" icon={faCompass} />
                    </Link>
                </div>
                
            </div>
            <Switch>
                <Route path='/mainpage/membership' ><MainPageMembership /></Route>
                <Route path='/mainpage/explore'  ><MainPageExplore /></Route>
            </Switch>
        </div>
    )
}

const ActiveDiv = styled(motion.div)`
    width: 100px;
    height: 60px;
    background-color: #fff;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    display: flex;
    font-size: 2.5rem;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: -1;
    
`


export default MainPage