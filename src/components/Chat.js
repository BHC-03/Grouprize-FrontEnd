import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useRecoilValue } from "recoil";
import { userInfoAtom,activeGroupAtom } from "../RecoilStuff";

const Chat = ()=>{
    const activeGroup = useRecoilValue(activeGroupAtom);
    const signedUserInfo = useRecoilValue(userInfoAtom);
    const [Auth,setAuth] = useState(false)
    const [message,setMessage] = useState('')
    function typingHandler(e){
        setMessage(e.target.value)
    }
    function sendHandler(){
   
    }
    useEffect(()=>{
        if(activeGroup){
            let found;
            if (activeGroup.group){
                found = activeGroup.group.memberships.find(membership=> membership.user.id == signedUserInfo.id)
            }else{
                found = activeGroup.memberships.find(membership=> membership.user.id == signedUserInfo.id)
            }
            
            if(found.role == "MEMBER" || found.role == "ADMIN"){
                setAuth(true)
            }else{
                setAuth(false)
            }
        }
    },[activeGroup])
    useEffect(async()=>{
        if(Auth){
            let socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${activeGroup.chat}/`,[`${signedUserInfo.token}`]);
            console.log(socket)
        }
    },[Auth,activeGroup])

    return(
        <div className="ChatContainer">
            
            <div className="chatLoggerContainer">
                
            </div>
            <div className="chatInputContainer">
                <input onChange={typingHandler} value={message} type="text" className="messageInput" />
                <p onClick={sendHandler} className="button messageButton"><FontAwesomeIcon className="sendIcon" icon={faPaperPlane} /></p>
            </div>
        </div>
    )
}


export default Chat;