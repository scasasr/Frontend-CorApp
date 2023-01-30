import React from "react";

//cookie component import
import Cookies from "universal-cookie";


const Beneficiary = () => {
    var cookie = new Cookies();

    return(
        <>
        <h3>Nombre: {cookie.get()}</h3>
        <h3>Apellido: {cookie.get()}</h3>
        <h3>email: {cookie.get()}</h3>
        <h3>Rol: {cookie.get()}</h3>

        
        </>
    );

};
export default Beneficiary;