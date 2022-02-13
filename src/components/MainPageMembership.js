import axios from "axios";
import React,{useState,useEffect} from "react";
import Group from "./membershipGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt,faSignInAlt,faTimes,faCheck } from "@fortawesome/free-solid-svg-icons";
import Request from "./request";
import Chat from "./Chat";
const MainPageMembership = ({signedUserInfo})=>{
    
    const [usersGroups,setUsersGroups]=useState()
    const [rejectedGroups,setRejectedGroups]=useState([])
    const [adminOrMemberGroups,setAdminOrMemberGroups]=useState([])
    const [activeGroup,setActiveGroup]=useState({})
    const [pindingGroups,setPindingGroups]=useState([])
    const [popUpActive,setPopUpActive] = useState(false)
    let popUpStyling;
    let pageStyling;
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
    function closeHandler(){
        setPopUpActive(false);
    }
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/groups/',{headers:{
            Authorization: `Bearer ${signedUserInfo.token}`
        }}).then(data=>{
            setUsersGroups( data.data.filter(group=>{
                let memberships = group.memberships;
                if(memberships.find(membership=> membership.user.id === signedUserInfo.id)) return group
               
            }))
        })       
    },[signedUserInfo])
    useEffect(()=>{
        if(usersGroups){
            setRejectedGroups(
                usersGroups.filter(group=>{
                    let memberships = group.memberships
                    let membership = memberships.find(membership=> membership.user.id === signedUserInfo.id)
                    if(membership.role == 'REJECTED') return group
                }))
            setAdminOrMemberGroups(
                    usersGroups.filter(group=>{
                        let memberships = group.memberships
                        let membership = memberships.find(membership => membership.user.id === signedUserInfo.id)
                        if(membership.role == 'ADMIN' || membership.role == 'MEMBER') return group
                    }))
            setPindingGroups(
                usersGroups.filter(group=>{
                    let memberships = group.memberships
                    let membership = memberships.find(membership=> membership.user.id === signedUserInfo.id)
                    if(membership.role == "PENDING") return group
            }))
        }
    },[usersGroups])

    if(usersGroups){
        return <div className="mainpageAndPopUpContainer">
        <div style={pageStyling} className="mainPageMembershipContainer mainPageContainer">
            <div className="memberGroups groupsContainer">
            <h3 className="memberGroupsTitle groupsTitle">your Groups:</h3>
            {
                 adminOrMemberGroups.map(group=>{
                    return <Group key={group.id} usergroup={group} setActiveGroup={setActiveGroup} setPopUpActive={setPopUpActive} />
                })
            }
            </div>
            <div className="pindingGroups groupsContainer">
                <h3 className="PidingGroupsTitle groupsTitle">Pinding Groups:</h3>
                {
                pindingGroups.map(group=>{
                    return <Group key={group.id} usergroup={group} setActiveGroup={setActiveGroup} setPopUpActive={setPopUpActive} />
                })
            }
                
            </div>
            <div className="rejectedGroups groupsContainer">
                <h3 className="rejectedGroupsTitle groupsTitle">rejected requests:</h3>
                {
                rejectedGroups.map(group=>{
                    return <Group key={group.id} usergroup={group} setActiveGroup={setActiveGroup} setPopUpActive={setPopUpActive} />
                })
            }
            </div>
        </div>
        <div style={popUpStyling} className="popUpDetails popUpMembership">
           <p className="closePopUp" onClick={closeHandler}> <FontAwesomeIcon  icon={faTimes} /> </p>
            <div className="chatOrRequests">
                
                <Chat />
                
            </div>
            <div className="tabsNav">
                <p className="tabNavIcon chatIcon"><FontAwesomeIcon icon={faCommentAlt} /></p>
                <p className="tabNavIcon requestsIcon"><FontAwesomeIcon icon={faSignInAlt} /></p>
            </div>
        </div> 
    </div> 
    }
    return (
        ''

          
        
    )
}


export default MainPageMembership;