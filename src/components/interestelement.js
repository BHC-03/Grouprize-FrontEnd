import React from "react";

const InterestElement = ({interest,setInterestsIds,interestsIds})=>{
        function addRemoveHandler(){
            let temparray = interestsIds.find(id=> id===interest.id)
            if(temparray){
                let temp = interestsIds.filter(id=> id!== interest.id);
                setInterestsIds([...temp])
                interest.isActive = false;
            }else{
                interest.isActive = true;
                setInterestsIds([...interestsIds,interest.id])
            }
            
            
        }
    return(
        <p onClick={addRemoveHandler} className={`button interest ${interest.isActive?'selected':''}`}>{interest.title}</p>
    )
}

export default InterestElement;