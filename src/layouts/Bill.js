import React from "react";


const Bill = () =>{
    return(
        <>
        <h1>factura</h1>
        {console.log(JSON.parse(localStorage.getItem("cartProducts")))}
        </>
    );

};

export default Bill;