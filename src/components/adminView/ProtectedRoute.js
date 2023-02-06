import React from "react";
import { Navigate } from "react-router-dom";

//cookie component import
import Cookies from "universal-cookie";

export const ProtectedRoute =({children}) =>{
    var cookie = new Cookies();

    let logged = cookie.get('logged');
    let role = cookie.get('role')

    if(logged === "false"){
        return <Navigate to='/login'/>
    }

    if(role !== "admin"){
        return <Navigate to='/'/>
    }

    return children;
}