import { selector } from "recoil";
import memberShipExistenceSelector from "./membershipExistenceSelector";

const isMemberSelector = selector({
    key:'isMemberSelector',
    get:({get})=>{
        const memberShipExistence = get(memberShipExistenceSelector);
        if(memberShipExistence){
            if(memberShipExistence.role === "MEMBER" || memberShipExistence.role === "ADMIN"){
                return true
            }else{
                return false
            }
        }else{
            return false
        }

    }
})


export default isMemberSelector