import React from "react";

import Navbar_all from "../../components/Navbar.js";
import API from "../../services/http-common.js";


const Posts = () => {

    return (<>
        {/*NAVBAR START*/}
        {Navbar_all("lock_person","how_to_reg","/login","RoleSelect","Entrar","Registrarse")}
        {/*NAVBAR END*/}

        
    </>);
}
 
export default Posts;