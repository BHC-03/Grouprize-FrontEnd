import React from "react";
import { Route ,Redirect } from "react-router-dom";


export const ProtectedRoute = ({component:Component ,signedUserInfo,path }) => {
    return (<Route 
            path={path}
            render ={
                 props=>{
                     if(signedUserInfo){
                         return <Component {...props} />
                         
                     }else{
                         <Redirect to={'/login/'} />
                     }
                 }   
            }
        />)
}