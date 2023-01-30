import React from "react";
import Posts from '../../components/totalCart/posts/Posts.js'
import Cart from "../../components/totalCart/cart/Cart.js";
//cookie component import
import Navbar_all from "../../components/Navbar.js";
import Cookies from "universal-cookie";
import { CartProvider } from "../../components/totalCart/context/CartContext.js";


const Buyer = () => {
    var cookie = new Cookies();

    return(
      <>

        {/*NAVBAR START*/}
        {Navbar_all("lock_person","how_to_reg","/login","RegisterCB","Entrar","Registrarse")}
        {/*NAVBAR END*/}
        <CartProvider>
            <div>
            <h1>Productos</h1>
              <Cart/>
              <Posts/>
            </div>   
        </CartProvider>
      </>
    );

};
export default Buyer;