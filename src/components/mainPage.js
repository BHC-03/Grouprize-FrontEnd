import React from "react";
import { BrowserRouter as Router,Switch,Route } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass,faHome} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MainPageMembership from "./MainPageMembership";
import MainPageExplore from "./MainPageExplore";
import LoginForm from "./login";

const MainPage = ({signedUserInfo,setSignedUserInfo,userInfo,setUserInfo})=>{
    if(!signedUserInfo.token){
        return <LoginForm setSignedUserInfo={setSignedUserInfo} signedUserInfo={signedUserInfo} userInfo={userInfo} setUserInfo={setUserInfo}/>
    }
    return (
        <div className="mainPageContainer">
            <div className="Nav">
                
                <div className="homeIconContainer">
                    <Link to={'/mainpage/'}>
                        <FontAwesomeIcon className="homeIcon mainPageIcon" icon={faHome} />
                    </Link>
                </div>
                <div className="exploreIconContainer">
                    <Link to={'/mainpage/explore/'}>
                        <FontAwesomeIcon className="exploreIcon mainPageIcon" icon={faCompass} />
                    </Link>
                </div>
                
            </div>
            <MainPageMembership signedUserInfo={signedUserInfo} />
        </div>
    )
}



export default MainPage