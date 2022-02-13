import React from "react"; 

const MembershipGroup = ({usergroup,setActiveGroup,setPopUpActive,signedUserInfo})=>{
    function enterGroupHandler(){
        setActiveGroup(usergroup)
        setPopUpActive(true);
        console.log(usergroup.memberships)
    }
    return(
        <div onClick={enterGroupHandler} className="group">
            <p className="GroupTitle">{usergroup.title}</p>
        </div>
    )
}


export default MembershipGroup;