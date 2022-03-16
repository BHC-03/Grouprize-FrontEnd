import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes,faCommentAlt,faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Switch,Link } from "react-router-dom";
import Chat from "../Chat";
import Request from "../request";
import { activeGroupAtom } from "../../RecoilStuff";
import { useRecoilValue } from "recoil";
import { Route } from "react-router-dom";
const AdminPopUp =({popUpStyling,setPopUpActive}) => {
  
    const activeGroup = useRecoilValue(activeGroupAtom);
    function closeHandler(){
        setPopUpActive(false);
    }
    return(
        <div style={popUpStyling} className="popUpDetails popUpMembership">
            <p className="closePopUp" onClick={closeHandler}> <FontAwesomeIcon  icon={faTimes} /> </p>
             <div className="chatOrRequests">
                 <Switch >
                    <Route exact path={'/mainpage/membership'}><Chat /></Route>
                    <Route exact path={'/mainpage/membership/Requests'}>{
                        
                        activeGroup.memberships? activeGroup.memberships.map(membership=>{
                            if(membership.role == "PENDING") return <Request key={membership.id}  membership={membership} />
                        }):''
                    }</Route>
                 </Switch>
                 
             </div>
             <div className="tabsNav ">
             <Link className="tabNavIcon chatIcon" to={'/mainpage/membership'}><p><FontAwesomeIcon icon={faCommentAlt} /></p></Link>
                 <Link className="tabNavIcon" to={'/mainpage/membership/Requests'}><p><FontAwesomeIcon icon={faSignInAlt} /></p></Link>
             </div>
         </div>
    )
}

export default AdminPopUp;