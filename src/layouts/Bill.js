import React, {useState,useEffect} from "react";
import style from '../components/totalCart/ItemCart/style.module.scss'
import Navbar_all from "../components/Navbar.js";
import { Divider } from "@mui/material";

//Icons 
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import NotesIcon from '@mui/icons-material/Notes';


import API from "../services/http-common.js";
import Cookies from "universal-cookie";


const Bill = () =>{
    //cookie
    var cookie = new Cookies();

    const [delivery,setDelivery] = useState(0);
    const [service, setService] = useState(0);
    const [userId, setUserId] = useState(cookie.get('user_id'));
    const [sendInformation,setSendInformation]=useState(false);
    
    //data order 
    const [address,setAddress] = useState('');
    const [details,setDetails] = useState('');
  
    const [cartItems, setCartItems] = useState(()=>{
        try {
            const localStoragePosts = localStorage.getItem("cartProducts");
            return localStoragePosts ? JSON.parse(localStoragePosts) : [];
        } catch (error) {
            return [];
        }
    });

    const [description,setDescription] = useState(() =>{
        var descriptions = 'Pago ';
        cartItems.map((item,i) => (
            descriptions = (descriptions + item.description + ' - ')
        ))
        return descriptions
    });


    
    const [totalProducts,setTotalProducts] = useState(() => cartItems.reduce(
        (previous,current) => previous + current.amount*current.price.$numberDecimal,
        0
        ));

    const [total,setTotal] = useState(totalProducts + delivery + service);

     

    const goTuCompra = (bill) =>{
      const values= {
        bill:bill,
        total:total,
        description:description,
        userId:userId,
        address:address
      }
      console.log(values);
      const data = JSON.stringify(values);
      API.post('conections/TuCompra',data).then((response) => {
        if(response.status === 200){
            console.log(response.data);
            window.location.href = response.data;
        }
      }).catch((error) => {
        console.log(error);
      })
    }

    const sendOrder = () =>{  
        const values = {
            buyer:userId,
            address:address,
            details:details,
            transaction:'63ff7f984034a758d059579b',//default value, backend method modificate this value
            products:cartItems,
            total:total
        }
        const data = JSON.stringify(values);
        API.post('orders/add',data).then((response) => {
          if(response.status === 201){
              goTuCompra(response.data);
              document.getElementById("Address").value = "";
              document.getElementById("Details").value = "";
          }
        }).catch((error) => {
          console.log(error);
        })
    } 
      
    const onChangeAddress= (e) => {
        if(e.target.value && e.target.value.length > 0){
            setAddress(e.target.value); 
        }
    }

    const onChangeDetails= (e) => {
        if(e.target.value && e.target.value.length > 0){
            setDetails(e.target.value); 
        }else{
            setDetails('nodetails');
        }
    }

    const itemBill = (item) =>{
        const photo = item.photo
        return(<>
            
            <div className={style.cartItem}>
                <img src={photo} alt={item.description}/>
                <div className={style.dataContainer}>
                    <div className={style.left}>
                        <p>{item.description}</p>
                    </div>
                    <div className={style.right}>
                        <div>
                            {item.amount}
                        </div>
                        <p>Total: ${item.amount*item.price.$numberDecimal}</p>
                    </div>
                </div>
            </div>
        
        </>)
    }

    useEffect(() => {
        setTotal(totalProducts + delivery + service);
    }, [totalProducts || delivery  || service]);

    return(
        <>
        {/*NAVBAR START*/}
        {Navbar_all("lock_person","how_to_reg","/login","RoleSelect","Entrar","Registrarse")}
        {/*NAVBAR END*/}
        <div>
            <div className="billContainer mt-5">
                <div className="pb-5">
                    <div className="summary_container_1 pb-4">
                        <div className="summary_container">
                            <h5 className="py-2" style={{color:"#fff"}}>Dirección de entrega</h5>
                        </div>
                        <div>
                            <div className="inputContainer mt-4">
                                <div className="input-group my-3 mr-3" style={{height:"38px"}}>
                                    <span className="input-group-text"><LocationSearchingIcon/></span>
                                    <input 
                                        className="form-control"
                                        type="text" 
                                        id="Address" 
                                        name= "Address" 
                                        placeholder="Dirección"
                                        onChange={onChangeAddress}
                                    />
                                </div>       
                            </div>
                            <Divider/>
                            <p className="ml-3 mt-5 d-flex justify-content-start">Indicaciones de la entrega (opcional)</p>
                            
                            <div className="input-group my-3">
                                <span className="input-group-text"><NotesIcon/></span>
                                <input 
                                    className="form-control"
                                    type="text" 
                                    id="Details" 
                                    name= "Details" 
                                    placeholder="Indicaciones entrega (Ejm: Bloque,Apto,Casa)"
                                    onChange={onChangeDetails}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="summary_container_1 mt-5 pb-4">
                        <div className="summary_container">
                            <h5 className="py-2" style={{color:"#fff"}}>Productos</h5>
                        </div>
                        {cartItems.map((item,i) => (
                            itemBill(item)
                        ))}
                    </div>
                    
                </div>

                
                
                <div className="summary_container_3">

                <div className="summary_container_2">
                    <h5 className="py-2" style={{color:"#fff"}}>Resumen</h5>
                </div>
                <div >
                    <div className="d-flex justify-content-between">
                        <p className="ml-2 ">Costo de productos:</p>
                        <p className="mr-2">{totalProducts}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                        <p className="ml-2 ">Costo de envios:</p>
                        <p className="mr-2">{delivery}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                        <p className="ml-2 ">Costo de servicio:</p>
                        <p className="mr-2">{service}</p>
                    </div>
    
                    <Divider/>
                    <div className="d-flex justify-content-between">
                        <h5 className="ml-2 ">Total:</h5>
                        <h5 className="mr-2">{total}</h5>
                    </div>
                    <Divider/>
                    
                    <button className="btn btn-success mt-4" onClick={() => sendOrder()} >Pagar</button>
                    
                        
                    
                </div>
                </div>
            </div>

            
        </div>
        </>
    );

};

export default Bill;