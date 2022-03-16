import { selector } from "recoil";
import userGroupsAtom from "../Atoms/userGroupsAtom";
import userInfo from "../Atoms/UserInfoAtom";
const pendingGroupsSelector = selector({
    key:'pendingGroupsSelector',
    default:[],
    get:({get})=>{
       const signedUserInfo = get(userInfo);
       const userGroups = get(userGroupsAtom);
       if(userGroups){return userGroups.filter(group=>{
        let memberships = group.memberships
        let membership = memberships.find(membership=> membership.user.id === signedUserInfo.id)
        if(membership.role == "PENDING") return group
        })}else{
            return [];
        }
       
    }
})

export default pendingGroupsSelector;