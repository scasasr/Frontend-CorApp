import React from "react";

//cookie component import
import Cookies from "universal-cookie";


const Seller = () => {
    var cookie = new Cookies();

    return(
        <>
        <h3>Nombre: {cookie.get('name')}</h3>
        <h3>Apellido: {cookie.get('lastname')}</h3>
        <h3>email: {cookie.get('email')}</h3>
        <h3>Rol: {cookie.get('role')}</h3>
        
        </>
    );

};
export default Seller;