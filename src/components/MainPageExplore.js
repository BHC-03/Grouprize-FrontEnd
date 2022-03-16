import axios from "axios";
import React,{useState,useEffect} from "react";
import Group from "./group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus ,faTimes,faCommentAlt,faSignInAlt} from "@fortawesome/free-solid-svg-icons";
import Chat from "./Chat";
import AdminPopUp from "./PopUps/adminPopUp";
import MemberPopUp from "./PopUps/memberPopUp";
import NonMemberPopUp from "./PopUps/nonMemberPopup";
import { useRecoilValue} from "recoil";
import { userInfoAtom,activeGroupAtom,isMemberSelector,isAdminSelector } from "../RecoilStuff/index";
const MainPageExplore = ()=>{

    //recoil shit
    const signedUserInfo = useRecoilValue(userInfoAtom);
    const activeGroup = useRecoilValue(activeGroupAtom);
    const isAdmin = useRecoilValue(isAdminSelector);
    const isMember = useRecoilValue(isMemberSelector);


    //local states 
    const [groups,setGroups] = useState([]);
    const [popUpActive,setPopUpActive] = useState(false)

    let popUpStyling;
    let pageStyling;

    function closeHandler(){
        setPopUpActive(false)
    }
    if(popUpActive){
        popUpStyling={
            opacity:1
            ,
            transform : 'translate(-50%,-50%)',
            'pointer-events':'all'
        }
        pageStyling={
            filter : 'blur(4px) brightness(0.5)',
            'pointer-events':'none'
        }
    }else{
        popUpStyling={
            opacity:0
            ,transform:'translate(-50%,-40%)',
            'pointer-events':'none'
        }
        pageStyling={
            filter : 'blur(0px) brightness(1)',
            'pointer-events':'all'
        }
    }
    useEffect(()=>{
        if(signedUserInfo.token){
            axios.get('http://127.0.0.1:8000/ads/',{headers:{Authorization:`Bearer ${signedUserInfo.token}`}}).then(
            data=>{
                console.log(data.data);
                setGroups(data.data);
            }
        )
        }
    }
    ,[signedUserInfo])
    return (
        
        <div className="mainpageAndPopUpContainer">
            <div style={pageStyling} className="mainPageExploreContainer ">
                <h3 className="ExploreTitle mainPageTitle">Groups</h3>
                <div className="exploreGroupsContainer">
                    {
                        groups.map(group=>{
                            return <Group key={group.id}  usergroup={group}  setPopUpActive={setPopUpActive} />
                        })
                    }
                </div>
            </div>
            {activeGroup? isMember?
            isAdmin? <AdminPopUp popUpStyling={popUpStyling} setPopUpActive={setPopUpActive} /> :<MemberPopUp popUpStyling={popUpStyling} setPopUpActive={setPopUpActive} /> :<NonMemberPopUp  popUpStyling={popUpStyling} setPopUpActive={setPopUpActive}/>: ''}
            
        </div>
    )
}



export default MainPageExplore;