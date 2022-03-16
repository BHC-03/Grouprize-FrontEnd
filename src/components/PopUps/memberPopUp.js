import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes,faCommentAlt,faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import Chat from "../Chat";
const MemberPopUp = ({popUpStyling,setPopUpActive}) => {
    function closeHandler(){
        setPopUpActive(false);
    }
    return(
        <div style={popUpStyling} className="popUpDetails popUpMembership">
            <p className="closePopUp" onClick={closeHandler}> <FontAwesomeIcon  icon={faTimes} /> </p>
             <div className="chatOrRequests">
                 <Chat  /> 
             </div>
             <div className="tabsNav memberShit">
                 <p className="tabNavIcon chatIconMemberShit chatIcon"><FontAwesomeIcon icon={faCommentAlt} /></p>
             </div>
         </div>
    )
}


export default MemberPopUp;