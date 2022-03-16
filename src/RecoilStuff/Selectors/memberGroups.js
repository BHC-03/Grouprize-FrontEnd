import { selector } from "recoil";
import userGroupsAtom from "../Atoms/userGroupsAtom";
import userInfo from "../Atoms/UserInfoAtom";
const memberGroupsSelector = selector({
    key:'memberGroupsSelector',
    default:[],
    get:({get})=>{
       const userGroups = get(userGroupsAtom);
       const signedUserInfo = get(userInfo);
       if(userGroups){
        return userGroups.filter(group=>{
            let memberships = group.memberships
            let membership = memberships.find(membership => membership.user.id === signedUserInfo.id)
            if(membership.role == 'ADMIN' || membership.role == 'MEMBER') return group
            })
       }else{
           return []
       }
    }
})

export default memberGroupsSelector;