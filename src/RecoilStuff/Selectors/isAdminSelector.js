import { selector } from "recoil";
import { memberShipExistenceSelector } from "..";

const isAdminSelector = selector({
    key:'isAdminSelector'
    ,get:({get})=>{
        const membership = get(memberShipExistenceSelector);
        if(membership){
            if(membership.role === "ADMIN"){
                return true
            }else{
                return false
            }
        }else{
            return false
        }
    }
})

export default isAdminSelector;