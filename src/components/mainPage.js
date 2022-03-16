import React from "react";
import { BrowserRouter as Router,Switch,Route } from "react-router-dom/cjs/react-router-dom.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompass,faHome} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import MainPageMembership from "./MainPageMembership";
import MainPageExplore from "./MainPageExplore";
import LoginForm from "./login";
import { useRecoilState } from "recoil";
import { userInfoAtom } from "../RecoilStuff/index";

const MainPage = ()=>{
    const  [signedUserInfo,setSignedUserInfo] = useRecoilState(userInfoAtom);
    if(!signedUserInfo.token){
        if(window.sessionStorage.getItem('userInfo')){
            setSignedUserInfo(JSON.parse(sessionStorage.getItem('userInfo')))
        }else{
            return <LoginForm />
        }
    }
   
    return (
        <div className="mainPageContainer">
            <div className="Nav">
                
                <div className="homeIconContainer">
                    <Link to={'/mainpage/membership'}>
                        <FontAwesomeIcon className="homeIcon mainPageIcon" icon={faHome} />
                    </Link>
                </div>
                <div className="exploreIconContainer">
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



export default MainPage