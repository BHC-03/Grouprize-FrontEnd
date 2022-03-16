import React ,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes,faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { userInfoAtom,activeGroupAtom } from "../RecoilStuff";
import { useRecoilValue,useRecoilState } from "recoil";
const Request = ({membership})=>{
    const signedUserInfo = useRecoilValue(userInfoAtom);
    const [activeGroup,setActiveGroup ] = useRecoilState(activeGroupAtom);
    

    
    function acceptHandler(){
        axios.put(`http://127.0.0.1:8000/memberships/${membership.id}/`,{
            group: membership.group,
            id: membership.id,
            role:"MEMBER",
            user: membership.user.id
        },{headers:{
            Authorization : `Bearer ${signedUserInfo.token}`
        }}).then(
            data=> {
                    let temp = activeGroup.memberships;
                    let tempGroup = {
                        ...activeGroup
                        };
                    let index = (temp.indexOf(membership));
                    temp = [...temp,{...membership,role:'MEMBER'}]
                    temp.splice(index,1);
                    tempGroup.memberships = temp;
                    setActiveGroup(tempGroup);
            }
        )
        
    }
    function rejectHandler(){
        axios.put(`http://127.0.0.1:8000/memberships/${membership.id}/`,{
            id:membership.id,
            role:"REJECTED",
            user:membership.user.id
            ,group:membership.group
        },{headers:{
            Authorization: `Bearer ${signedUserInfo.token}`
        }}).then(
            data=>{
                let temp = activeGroup.memberships;
                    let tempGroup = {
                        ...activeGroup
                        };
                    let index = (temp.indexOf(membership));
                    temp = [...temp,{...membership,role:'REJECTED'}]
                    temp.splice(index,1);
                    tempGroup.memberships = temp;
                    setActiveGroup(tempGroup);
            }
        )
        
    }
    return(
        <div  className="request">
           <p className="theNameOfTheRequest">{membership.user.name}</p>
           <p onClick={acceptHandler} className="checkContainer"><FontAwesomeIcon icon={faCheck} /></p>
           <p onClick={rejectHandler} className="rejectContainer"><FontAwesomeIcon icon={faTimes} /></p>
        </div>
    )
}


export default Request;