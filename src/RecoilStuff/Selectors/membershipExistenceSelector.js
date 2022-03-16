import { selector } from "recoil";
import activeGroupAtom from "../Atoms/activeGroup";
import userInfo from "../Atoms/UserInfoAtom";

const memberShipExistenceSelector = selector({
    key:'memberShipExistenceSelector',
    get:({get})=>{
        let activeGroup = get(activeGroupAtom);
        const signedUserInfo = get(userInfo);
        if(activeGroup){
            if(activeGroup.group){
                activeGroup = activeGroup.group
            }
            let temp =  activeGroup.memberships.find(membership=> membership.user.id === signedUserInfo.id )
            if(temp){
                 return temp
            }else{
                 return false;
            }
        }
    }
})

export default memberShipExistenceSelector;