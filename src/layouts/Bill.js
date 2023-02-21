import React, {useState,useEffect} from "react";
import style from '../components/totalCart/ItemCart/style.module.scss'
import Navbar_all from "../components/Navbar.js";
import GoogleMap  from "simple-react-google-maps";
import { Divider } from "@mui/material";
import qs from "qs";

//Icons 
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import NotesIcon from '@mui/icons-material/Notes';


import API from "../services/http-common.js";


import { Link } from "react-router-dom";
import axios from "axios";


const Bill = () =>{

    const [delivery,setDelivery] = useState(0);
    const [service, setService] = useState(0);

    const [sendInformation,setSendInformation]=useState(false);
    //data Tu compra 
    const [terminal,setTerminal] = useState('jum96fe3r2j4xxsq');
    const [bill,setBill] = useState(1236554800);
    const [description,setDescription] = useState('Productos prueba');

    //data Tu compra user 
    const [documentNumber,setDocumentNumber] = useState('1089236522');
    const [documentType,setDocumentType] = useState('CC');
    const [userName,setUSerName] = useState('Perdro');
    const [userLastName,setUSerLastName] = useState('Gonzales');
    const [userEmail,setUserEmail] = useState('pgonzales@gmail.com');

 

    

    //geolocation
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    //
 
    const [cartItems, setCartItems] = useState(()=>{
        try {
            const localStoragePosts = localStorage.getItem("cartProducts");
            return localStoragePosts ? JSON.parse(localStoragePosts) : [];
        } catch (error) {
            return [];
        }
    });


    
    const [totalProducts,setTotalProducts] = useState(() => cartItems.reduce(
        (previous,current) => previous + current.amount*current.price.$numberDecimal,
        0
        ));

    const [total,setTotal] = useState(totalProducts + delivery + service);

    // const test = () =>{
    //     // const data =JSON.stringify(values);
    //     // const data =utf8.encode(values);
    //     console.log('sending');
    //     const params = new URLSearchParams();
    //     params.append('usuario', 'jum96fe3r2j4xxsq');
    //     params.append('factura', '1230569');
    //     params.append('valor', '100000');
    //     params.append('descripcionFactura', 'PruebaEnvio');
    //     console.log(params);
    //    const options = {
    //     method:'POST',
    //     headers:{'content-type': 'application/x-www-form-urlencoded'},
    //     data:params,
    //     url:"https://demover3-1.tucompra.net/tc3/app/inputs/compra.jsp"
    //    }
    //    setSendInformation(false);
    //    return axios(options).then((response) => {
    //     console.log(response.status)
    //    }).catch((error)=>{
    //     console.log(error)
    //    });
    // }

    // const test = (values) => {
    //     const data = qs.stringify(values)
    //     console.log(data);
    //     axios.post("https://demover3-1.tucompra.net/tc3/app/inputs/compra.jsp",data)

    // }

    const test = () =>{
        var data = qs.stringify({
            'usuario': 'jum96fe3r2j4xxsq',
            'factura': '10236589',
            'valor': '100000',
            'descripcionFactura': 'postmanTest' 
          });
        console.log(data)
        var config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://demover3-1.tucompra.net/tc3/app/inputs/compra.jsp',
        headers: { 
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
        };
        
        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    

    useEffect(() => {
        test();
    }, [sendInformation]);

    //geolocation
    const geolocationVer = () =>{
        if ('geolocation' in navigator) {
            getCoordinates();
        } else {
            console.log({geo:false})
        }
    }

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

    function error_geo(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const getCoordinates = () =>{
        navigator.geolocation.getCurrentPosition((position) => {
            // console.log("Latitude is :", position.coords.latitude);
            setLatitude(position.coords.latitude);
            // console.log("Longitude is :", position.coords.longitude);
            setLongitude(position.coords.longitude);
        },error_geo,options);

    }

    useEffect(() => {
        geolocationVer();  
    }, []);

    // const dataTest = {
    //     usuario:terminal,
    //     factura:bill,
    //     valor:total,
    //     descripcionFactura:description,
    //     documentoComprador:documentNumber,
    //     tipoDocumento:documentType,
    //     nombreComprador:userName,
    //     apellidoComprador:userLastName,
    //     correoComprador:userEmail
    // }

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
            <div className="d-flex justify-content-around mt-5">
                <div className="pb-5">
                    <div className="summary_container_1 pb-4">
                        <div className="summary_container">
                            <h5 className="py-2" style={{color:"#fff"}}>Dirección de entrega</h5>
                        </div>
                        <div>
                            <div className="d-flex mt-4">
                                <div className="m-4">
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

                                <div className="input-group my-3 mr-3" style={{height:"38px"}}>
                                    <span className="input-group-text"><LocationSearchingIcon/></span>
                                    <input 
                                        className="form-control"
                                        type="text" 
                                        id="Address" 
                                        name= "Address" 
                                        placeholder="Direccion"
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
                    
                    <button className="btn btn-success mt-4" onClick={() => setSendInformation(true)}>Pagar</button>
                    
                        
                    
                </div>
                </div>
            </div>

            
        </div>
        </>
    );

};

export default Bill;