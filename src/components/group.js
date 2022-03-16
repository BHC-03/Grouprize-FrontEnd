import React from "react"; 
import { useSetRecoilState } from "recoil";
import { activeGroupAtom} from "../RecoilStuff";

const ExploreGroup = ({usergroup,setPopUpActive})=>{
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


export default ExploreGroup;