import axios from "axios";
import React,{useState,useEffect} from "react";
import Group from "./group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus ,faTimes} from "@fortawesome/free-solid-svg-icons";

const MainPageExplore = ({signedUserInfo})=>{
    const [groups,setGroups] = useState([]);
    const [activeGroup,setActiveGroup] = useState();
    const [popUpActive,setPopUpActive] = useState(false)
    const [memberShipExistance,setMembershipExistance] = useState(false);
    let popUpStyling;
    let pageStyling;
    function requestHandler(){
        axios.post('http://127.0.0.1:8000/memberships/',{group:activeGroup.id},{headers:{
            Authorization: `Bearer ${signedUserInfo.token}`
        }}).then(
            data=> {console.log(data)
            setMembershipExistance(true);

        
            }
        )
        
    }
    function closeHandler(){
        setPopUpActive(false)
    }
    if(popUpActive){
        popUpStyling={
            opacity:1
            ,
            transform : 'translate(-50%,-50%)',
            'pointer-events':'all'
        }
        pageStyling={
            filter : 'blur(4px) brightness(0.5)',
            'pointer-events':'none'
        }
    }else{
        popUpStyling={
            opacity:0
            ,transform:'translate(-50%,-40%)',
            'pointer-events':'none'
        }
        pageStyling={
            filter : 'blur(0px) brightness(1)',
            'pointer-events':'all'
        }
    }
    useEffect(()=>{
        axios.get('http://127.0.0.1:8000/ads/',{headers:{Authorization:`Bearer ${signedUserInfo.token}`}}).then(
            data=>{
                setGroups(data.data);
            }
        )
    }
    ,[])
    return (
        <div className="mainpageAndPopUpContainer">
            <div style={pageStyling} className="mainPageExploreContainer ">
                <h3 className="ExploreTitle mainPageTitle">Groups</h3>
                <div className="exploreGroupsContainer">
                    {
                        groups.map(group=>{
                            return <Group key={group.id} signedUserInfo={signedUserInfo} usergroup={group} setActiveGroup={setActiveGroup} setPopUpActive={setPopUpActive} setMembershipExistance={setMembershipExistance}/>
                        })
                    }
                </div>
            </div>
            {activeGroup?<div style={popUpStyling} className="popUpDetails">
                    <p className="closeIcon"><FontAwesomeIcon icon={faTimes} onClick={closeHandler} /></p>
                    <h3 className="groupTitleDetails">{activeGroup.title}</h3>
                    <p className="groupDiscreption">{activeGroup.description}</p>
                    <p className="groupAdmin">{activeGroup.user.name}</p>
                    {memberShipExistance?<p  className="alreadyIn">User already has a membership</p>:<p onClick={requestHandler} className="button requestbutton"><FontAwesomeIcon icon={faPlus} /></p>}
            </div> : ''}
            
        </div>
    )
}



export default MainPageExplore;