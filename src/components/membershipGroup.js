import React from "react"; 
import { useSetRecoilState } from "recoil";
import { activeGroupAtom } from "../RecoilStuff";


const MembershipGroup = ({usergroup,setPopUpActive})=>{
    //Recoil Shit
    const setActiveGroup = useSetRecoilState(activeGroupAtom);


    function enterGroupHandler(){
        setActiveGroup(usergroup)
        setPopUpActive(true);
    }
    return(
        <div onClick={enterGroupHandler} className="group">
            <p className="GroupTitle">{usergroup.title}</p>
        </div>
    )
}


export default MembershipGroup;