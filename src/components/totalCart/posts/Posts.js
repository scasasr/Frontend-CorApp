import React, { useContext } from "react";
import { useState , useEffect} from "react";
import style from'./style.module.scss';
import { Modal } from 'react-bootstrap';

import API from '../../../services/http-common.js'
import { cartContext } from "../context/CartContext.js";


const Posts = () =>{

    
 //Show PRODUCT SPECIFICATION
//  const [showProductSpecification, setShowProductSpecification] = useState(false);

//  const [handleCloseProductSpecification]= () => setShowProductSpecification(false);
//  const [handleShowProductSpecification] = () => setShowProductSpecification(true);

    const[postsData,setPostsData] = useState([]);

    const getPosts =async () =>{
        return await API.get('/posts/all/availables').then((response)=>{
            setPostsData(JSON.parse(JSON.stringify(response.data)));
            console.log(postsData);
        }).catch((error)=>{
            console.log(error);
        });
    }
    
    useEffect(() => {
        getPosts();
      }, []);
    
    const{addItemToCart}= useContext(cartContext)


    return(<>
        <div class={style.productsContainer}>
            {postsData.map((post,i) =>(     
                <div key={i} class={style.product} >
                    <img src={post.photo} alt={post._id}/>
                    <>
                    <div>
                        <p>{post.description} - ${post.price.$numberDecimal}</p>
                    </div>
                    <button onClick={() => addItemToCart(post)}>Agregar</button>
                    </>
                </div>             
            ))}
        </div>


        {/*MODAL SELECT PRODUCT*/}
        {/* <Modal show={showProductSpecification} onHide={handleCloseProductSpecification}>
            <Modal.Header closeButton>
                <Modal.Title>prosuctSpecification</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1>hello</h1>
            </Modal.Body>
        </Modal> */}
    </>);
};

export default Posts;