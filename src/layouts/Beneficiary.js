import React from "react";


import Donations from "../components/totalCart/posts/Donations.js";
import Navbar_all from "../components/Navbar.js";
const Beneficiary = () => {

    
    return (<>
        {/*NAVBAR START*/}
        {Navbar_all("lock_person","how_to_reg","/login","/RoleSelect","Entrar","Registrarse")}
        {/*NAVBAR END*/}
        <>
            <Donations/>
        </>

    </>);
}
 
export default Beneficiary;