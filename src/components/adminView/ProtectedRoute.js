import React from "react";
import { Navigate } from "react-router-dom";

//cookie component import
import Cookies from "universal-cookie";

export const ProtectedRoute =({children}) =>{
    var cookie = new Cookies();

    let logged = cookie.get('logged');
    let role = cookie.get('role')

    if(!logged){
        return <Navigate to='/login'/>
    }

    if(logged && role !== "admin"){
        return <Navigate to='/'/>
    }

    return children;
}