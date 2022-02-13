import React from "react"; 

const ExploreGroup = ({usergroup,setActiveGroup,setPopUpActive,setMembershipExistance,signedUserInfo})=>{
    function enterGroupHandler(){
        setActiveGroup(usergroup)
        setPopUpActive(true);
        setMembershipExistance(false);
          let temp =  usergroup.group.memberships.find(membership=> membership.user.id === signedUserInfo.id )
        setMembershipExistance(temp)
    }
    return(
        <div onClick={enterGroupHandler} className="group">
            <p className="GroupTitle">{usergroup.title}</p>
        </div>
    )
}


export default ExploreGroup;