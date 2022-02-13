import React ,{useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes,faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Request = ({membership,signedUserInfo})=>{
    let styling;
    function acceptHandler(){
        axios.put(`http://127.0.0.1:8000/memberships/${membership.id}/`,{
            group: membership.group,
            id: membership.id,
            role:"MEMBER",
            user: membership.user.id
        },{headers:{
            Authorization : `Bearer ${signedUserInfo.token}`
        }}).then(
            data=> styling={
                display: 'none'
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
            data=> styling={
                display:'none'
            }
        )
        
    }
    return(
        <div style={styling} className="request">
           <p className="theNameOfTheRequest">{membership.user.name}</p>
           <p onClick={acceptHandler} className="checkContainer"><FontAwesomeIcon icon={faCheck} /></p>
           <p onClick={rejectHandler} className="rejectContainer"><FontAwesomeIcon icon={faTimes} /></p>
        </div>
    )
}


export default Request;