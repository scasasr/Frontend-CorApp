import {createContext,useEffect,useState } from "react";

export const cartContext = createContext()


export const CartProvider = ({children}) =>{
    const [cartItems, setCartItems] = useState(()=>{
        try {
            const localStoragePosts = localStorage.getItem("cartProducts");
            return localStoragePosts ? JSON.parse(localStoragePosts) : [];
        } catch (error) {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("cartProducts", JSON.stringify(cartItems));
        console.log(cartItems)
    },[cartItems]);


    const addItemToCart = (post) => {
        const inCart = cartItems.find(
            (postInCart) => postInCart._id === post._id
        );

        if(inCart){
            setCartItems(
                cartItems.map((postInCart) =>{
                    if (postInCart._id === post._id){
                        return{ ...inCart, amount: inCart.amount +1}
                    }else return postInCart;
                })
            );
        }else{
            setCartItems([...cartItems,{ ...post, amount:1}])
        }

    };

    const deleteItemToCart = (post) =>{
        const inCart = cartItems.find(
            (postInCart) => postInCart._id === post._id
        );
        if(inCart.amount === 1){
            setCartItems(
                cartItems.filter((postInCart) => postInCart._id !== post._id)
            );
        }else{
            setCartItems(
                cartItems.map((postInCart) =>{
                if(postInCart._id === post._id){
                    return {...inCart,amount:inCart.amount - 1};
                }else return postInCart;
            })
            );
        }

    };

    return(
        <cartContext.Provider value={{cartItems,addItemToCart,deleteItemToCart}}>
            {children}
        </cartContext.Provider>
    )

};
