import React, { useContext } from "react";
import { useState , useEffect} from "react";
import style from'./style.module.scss';
import { Button, Modal } from 'react-bootstrap';

import API from '../../../services/http-common.js'
import { cartContext } from "../context/CartContext.js";
import {  Divider } from "@mui/material";
import GoogleMap  from "simple-react-google-maps";

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import MyLocationIcon from '@mui/icons-material/MyLocation';

const Posts = () =>{

    const [postId,setPostId] = useState('');
    const [postPhoto,setPostPhoto] = useState('');
    const [postDescription,setPostDescription] = useState('');
    const [postPrice,setPostPrice] = useState('');
    const [postDate,setPostDate] = useState('');
    const [productName,setProductName] = useState('');
    const [udmName,setUdmName] = useState('');
    const [qualityName,setQualityName] = useState('');
    const [squareName,setSquareName] = useState('');
    const [warehouseName,setWarehouseName] = useState('');
    const [placeName,setPlaceName] = useState('');
    const [latitude,setLatitude] = useState('');
    const [longitude,setLongitude] = useState('');
    const [partnerName,setPartnerName] = useState('');

    
    const[showModalSpecificationPost,setShowModalSpecificationPost]= useState(false);
    const[postsData,setPostsData] = useState([]);


    const handleOpenModalSpecificationPost = (post_id) =>{
        setShowModalSpecificationPost(true);
        setPostId(post_id);
        

    }

    
    const getPosts =async () =>{
        return await API.get('/posts/all/availables').then((response)=>{
            setPostsData(JSON.parse(JSON.stringify(response.data)));
            console.log(postsData);
        }).catch((error)=>{
            console.log(error);
        });
        
    }

    const getExtendPost = async () =>{
        if(postId !== undefined){
            return await API.get('/posts/extend/'+postId).then((response)=>{
                let data=JSON.parse(JSON.stringify(response.data));
                setPostPhoto(data.post.photo || ' ');
                setPostDescription(data.post.description  || ' ');
                setPostPrice(data.post.price.$numberDecimal || ' ');
                setPostDate(data.post.date_added || ' ');
                setProductName(data.product_name || ' ');
                setUdmName(data.udm_name || ' ');
                setQualityName(data.quality_name || ' ');
                setSquareName(data.square_name || ' ');
                setWarehouseName(data.warehouse_number || ' ');
                setPlaceName(data.place_name || ' ');
                setLatitude(data.latitude || ' ');
                setLongitude(data.longitude || ' ');
                setPartnerName(data.partner_name || ' ');       
            }).catch((error)=>{
                console.log(error);
            });
        }
        
    }
    

    useEffect(() => {
        getPosts();
      }, []);

    useEffect(() => {
        getExtendPost();
    }, [showModalSpecificationPost]);
    
    const{addItemToCart}= useContext(cartContext)
     
    return(<>
        <div class={style.productsContainer}>
            {postsData.map((post,i) =>(     
                <div key={i} className={style.product}>
                    <img src={post.photo} alt={post._id} width="250" height="200"/>
                    <>
                    <div>
                        <p>{post.description} - ${post.price.$numberDecimal}</p>
                    </div>
                    <button onClick={() => addItemToCart(post)}>Agregar</button>
                    <a onClick={() => handleOpenModalSpecificationPost(post._id)}>Ver detalles</a>
                    </>
                </div> 
                
                
            ))}
            <Modal show={showModalSpecificationPost} onHide={()=>setShowModalSpecificationPost(false)} disableScrollLock>
                <Modal.Header closeButton>
                    <Modal.Title>{productName}</Modal.Title>
                </Modal.Header>
                <div>   
                    <Modal.Body>
                        <div className="d-flex">
                            <div className={style.product}>
                                <img className={style.img} src={postPhoto} alt={postId} width="250" height="250" />
                            </div>
                            <div className="py-3">
                                <h3>Descripción</h3>
                                <p>{postDescription}</p>
                                <Divider/>
                                <h3><MonetizationOnIcon className="mr-1"/>Precio</h3>
                                <p>${postPrice}</p>
                                <Divider/>
                        
                            </div>
                        </div>
                        <div className="py-3">
                            <div>
                                <h3><DescriptionIcon className="mr-1"/>Resumen de la publicación</h3>
                                <div className="d-flex my-0">
                                    <h5 className="mr-2"><p>Nombre vendedor: </p></h5>
                                    <p>{partnerName}</p>
                                </div>

                                <div className="d-flex my-0">
                                    <h5 className="mr-2"><p>Fecha de publicación: </p></h5>
                                    <p>{postDate}</p>
                                </div>

                                <div className="d-flex my-0">
                                    <h5 className="mr-2"><p>Unidad de medida: </p></h5>
                                    <p>{udmName}</p>
                                </div>

                                <div className="d-flex my-0">
                                    <h5 className="mr-2"><p>Calidad: </p></h5>
                                    <p>{qualityName}</p>
                                </div>

                                <div className="d-flex my-0">
                                    <h5 className="mr-2"><p>Plaza: </p></h5>
                                    <p>{squareName}</p>
                                </div>

                                <div className="d-flex my-0">
                                    <h5 className="mr-2"><p>Bodega: </p></h5>
                                    <p className="mr-4">{warehouseName}</p>

                                    <h5 className="ml-4 mr-2"><p>Puesto: </p></h5>
                                    <p>{placeName}</p>
                                </div>
                            </div>
                            <Divider/>
                            <h3 className="mt-2"><MyLocationIcon className="mr-1"/>Ubicación</h3>
                            <div className="d-flex justify-content-center mt-4">
                                <GoogleMap
                                    apiKey={"AIzaSyBFkZKPPLySYchQ4VJHFXczriU9BwmHawQ"}
                                    style={{height:"300px",width:"370px"}}
                                    zoom={15}
                                    center={{
                                        lat:Number(latitude),
                                        lng:Number(longitude),
                                    }}
                                    markers={[
                                        {lat:Number(latitude),
                                        lng:Number(longitude),}
                                    ]}
                                />
                            </div>
                        
                        </div> 
                    </Modal.Body>
                </div>
                <Modal.Footer>
                    <Button  class="btn btn-danger" onClick={() => setShowModalSpecificationPost(false)}>Cerrar</Button>
                    <Button  class="btn btn-success">Agregar</Button>
                </Modal.Footer>
            </Modal> 
        </div>
    </>);
};

export default Posts;