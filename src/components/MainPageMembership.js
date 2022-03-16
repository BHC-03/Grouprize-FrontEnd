import axios from "axios";
import React,{useState,useEffect} from "react";
import Group from "./membershipGroup";
import MemberPopUp from "./PopUps/memberPopUp";
import NonMemberPopUp from "./PopUps/nonMemberPopup";
import AdminPopUp from "./PopUps/adminPopUp";
import { ClipLoader } from "react-spinners";
import {
    userInfoAtom
    ,userGroupsAtom
    ,pendingGroupsSelector
    ,memberGroupsSelector
    ,rejectedGroupsSelector
    ,activeGroupAtom
    ,isMemberSelector
    ,isAdminSelector
 } from "../RecoilStuff/index";
import { useRecoilValue,useRecoilState } from "recoil";
import { Suspense } from "react/cjs/react.production.min";
const MainPageMembership = ()=>{

    //Recoil Atoms And selectors
    const [usersGroups,setUsersGroups] = useRecoilState(userGroupsAtom);
    const signedUserInfo = useRecoilValue(userInfoAtom);
    const rejectedGroups = useRecoilValue(rejectedGroupsSelector);
    const pindingGroups = useRecoilValue(pendingGroupsSelector);
    const adminOrMemberGroups = useRecoilValue(memberGroupsSelector);
    const activeGroup = useRecoilValue(activeGroupAtom);
    const isMember = useRecoilValue(isMemberSelector);
    const isAdmin = useRecoilValue(isAdminSelector);
    //local States
    const [popUpActive,setPopUpActive] = useState(false)
    const [loading,setLoading] = useState(true);
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
   
    useEffect(()=>{
        console.log(signedUserInfo.token)
        axios.get('http://127.0.0.1:8000/groups/',{headers:{
            Authorization: `Bearer ${signedUserInfo.token}`
        }}).then(data=>{
            setUsersGroups( data.data.filter(group=>{
                let memberships = group.memberships;
                if(memberships.find(membership=> membership.user.id === signedUserInfo.id)) return group
            }))
            setLoading(false);
        })       
    },[signedUserInfo])


    if(usersGroups){
        return <div className="mainpageAndPopUpContainer">
        <div style={pageStyling} className="mainPageMembershipContainer mainPageContainer">
            <div className="memberGroups groupsContainer">
            <h3 className="memberGroupsTitle groupsTitle">your Groups:</h3>
            {   loading?<ClipLoader color="#f87cb4" size={150} />:
                 adminOrMemberGroups.map(group=>{
                    return( 
                        <Group key={group.id} usergroup={group}  setPopUpActive={setPopUpActive} />
                    )
                })
            }
            </div>
            <div className="pindingGroups groupsContainer">
                <h3 className="PidingGroupsTitle groupsTitle">Pinding Groups:</h3>
                {
                loading?<ClipLoader color="#f87cb4" size={150} />:
                pindingGroups.map(group=>{
                   return( 
                       <Group key={group.id} usergroup={group}  setPopUpActive={setPopUpActive} />
                   )
               })
            }
                
            </div>
            <div className="rejectedGroups groupsContainer">
                <h3 className="rejectedGroupsTitle groupsTitle">rejected requests:</h3>
                {
                loading?<ClipLoader color="#f87cb4" size={150} />:
                rejectedGroups.map(group=>{
                   return( 
                       <Group key={group.id} usergroup={group}  setPopUpActive={setPopUpActive} />
                   )
               })
            }
            </div>
        </div>
        {activeGroup?
            isMember? 
                isAdmin?<AdminPopUp popUpStyling={popUpStyling} setPopUpActive={setPopUpActive} />:<MemberPopUp popUpStyling={popUpStyling} setPopUpActive={setPopUpActive} /> 
            :<NonMemberPopUp popUpStyling={popUpStyling} setPopUpActive={setPopUpActive} />:''
        }
    </div> 
    }
    return (
        ''
    )
}


export default MainPageMembership;