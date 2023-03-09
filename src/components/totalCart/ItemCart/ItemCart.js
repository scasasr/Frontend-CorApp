import React, { useContext } from "react";
import { cartContext } from "../context/CartContext.js";
import style from './style.module.scss';

const ItemCart = ({item}) =>{

    const {deleteItemToCart,addItemToCart} = useContext(cartContext);

    const {id} = item;
    const photo = item.photo

    return (
    <>
        <div className={style.cartItem}>
            <img src={photo} alt={item.description}/>
            <div className={style.dataContainer}>
                <div className={style.left}>
                    <p>{item.description}</p>
                    <div className={style.buttons}>
                        <button  onClick={()=> addItemToCart(item)}>AGREGAR</button>
                        <button onClick={()=> deleteItemToCart(item)}>SACAR</button>
                    </div>
                </div>
                <div className={style.right}>
                    <div>
                        {item.amount}
                    </div>
                    <p>Total: ${item.amount*item.price.$numberDecimal}</p>
                </div>
            </div>
        </div>
    </>);
};

export default ItemCart;