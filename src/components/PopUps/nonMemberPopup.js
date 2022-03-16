import React from "react";
import { useRecoilValue,useRecoilState } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes ,faPlus} from "@fortawesome/free-solid-svg-icons";
import { memberShipExistenceSelector,userInfoAtom,activeGroupAtom} from "../../RecoilStuff";
import axios from "axios";

const NonMemberPopUp = ({popUpStyling,setPopUpActive})=>{
    const memberShipExistance = useRecoilValue(memberShipExistenceSelector);
    const [activeGroup,setActiveGroup] = useRecoilState(activeGroupAtom);
    const signedUserInfo = useRecoilValue(userInfoAtom);
    function requestHandler(){
        axios.post('http://127.0.0.1:8000/memberships/',{group:activeGroup.id},{headers:{
            Authorization: `Bearer ${signedUserInfo.token}`
        }}).then(
            data=> {
                axios.get(`http://127.0.0.1:8000/groups/${activeGroup.id}/`).then(
                    data=>{
                        setActiveGroup(data.data);
                    }
                )
            }
        )
        
    }
    
    function closeHandler(){
        setPopUpActive(false);
    }
    if(activeGroup.group){
        return(
        <div style={popUpStyling} className="popUpDetails">
        <p className="closeIcon"><FontAwesomeIcon icon={faTimes} onClick={closeHandler} /></p>
        <h3 className="groupTitleDetails">{activeGroup.title}</h3>
        <p className="groupDiscreption">{activeGroup.description}</p>
        <p className="groupAdmin">{activeGroup.user.name}</p>
        {memberShipExistance?<p  className="alreadyIn">User already has a membership</p>:<p onClick={requestHandler} className="button requestbutton"><FontAwesomeIcon icon={faPlus} /></p>}
        </div>)
    }else{
        return(
        <div style={popUpStyling} className="popUpDetails">
                    <p className="closeIcon"><FontAwesomeIcon icon={faTimes} onClick={closeHandler} /></p>
                    <h3 className="groupTitleDetails">{activeGroup.title}</h3>
                    {memberShipExistance?<p  className="alreadyIn">User already has a membership</p>:<p onClick={requestHandler} className="button requestbutton"><FontAwesomeIcon icon={faPlus} /></p>}
        </div>)
    }
    return(
        <></>
    )

}


export default NonMemberPopUp;