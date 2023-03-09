// import React, {useState,useEffect} from "react";

// import {Modal, ModalBody, ModalHeader} from 'react-bootstrap';
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { Snackbar,Alert } from "@mui/material";

// import Navbar_all from "../../components/Navbar.js";
// import API from "../../services/http-common.js";



// //Icons
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';
// import HelpIcon from '@mui/icons-material/Help';
// import SaveIcon from '@mui/icons-material/Save';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import DescriptionIcon from '@mui/icons-material/Description';
// import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';
// import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
// import StorefrontIcon from '@mui/icons-material/Storefront';


// //cookie component import
// import Cookies from "universal-cookie";


// const Posts = () => {

//     //cookie
//     var cookie = new Cookies();

//     const [postsData,setPostsData] = useState([]);
//     const [udmData,setUdmData] = useState([]);
//     const [qualityData,setQualityData] = useState([]);
//     const [productsData,setProductsData] = useState([]);
//     const [placesData,setPlacesData] = useState([]);
//     const [userId,setUserId] = useState('');
//     const [title,setTitle] = useState('');


//     //Show send verification
//     const [showSendVerification, setShowSendVerification] = useState(false);

//     const handleCloseSendVerification = () => setShowSendVerification(false);


//     const [showModalForm, setShowModalForm] = useState(false);

//     const handleCloseModalForm = () => setShowModalForm(false);

//     // const handleShowModalForm =(op,id,placeName,placeLatitude,placeLongitude,bogota,warehouse_id,partner_id,codeWarehouse) =>{
//     //     setShowModalForm(true);
//     //     setWarehouseId(id);

//     //     if(op === 1){
//     //         geolocationVer()
//     //         setTitle('Registrar puesto');
//     //         setOperation('Register');
//     //         setDisabledCheck(false);
//     //         setPartnerId('');
//     //         setWarehouseId('');
//     //         setInitialValues({
//     //             name:'',
//     //             latitude:latitude,
//     //             longitude:longitude,
//     //             is_bogota:'',
//     //             partner:'',
//     //             warehouse:''
//     //         })
//     //     }else if(op === 2){
//     //         setTitle('Editar puesto');
//     //         setOperation('Edit');
//     //         setDisabledCheck(true);
//     //         setChecked(bogota);
//     //         setWarehouseId(warehouse_id);
//     //         setPartnerId(partner_id);
//     //         setInitialValues({
//     //             name:placeName,
//     //             latitude:placeLatitude,
//     //             longitude:placeLongitude,
//     //             is_bogota:bogota,
//     //             partner:partner_id,
//     //             warehouse:warehouse_id
//     //         })

//     //     }
//     // }


//     const getPosts = async () =>{
//         return await API.get('posts/all').then((response) =>{
//         setPlacesData(JSON.parse(JSON.stringify(response.data)));
//         // console.log(dataCountries);
//     }).catch((error)=>{
//         console.log(error);
//     })
//     };

//     const getUdm = async () =>{
//         return await API.get('udm/all').then((response) =>{
//             setUdmData(JSON.parse(JSON.stringify(response.data)));
//             // console.log(dataCountries);
//         }).catch((error)=>{
//             console.log(error);
//         })   
//     };
//     const getQuality = async () =>{
//         return await API.get('qualities/all').then((response) =>{
//             setQualityData(JSON.parse(JSON.stringify(response.data)));
//             // console.log(dataCountries);
//         }).catch((error)=>{
//             console.log(error);
//         }) 
//     };
//     const getProducts = async () =>{
//         return await API.get('products/all').then((response) =>{
//             setProductsData(JSON.parse(JSON.stringify(response.data)));
//             // console.log(dataCountries);
//         }).catch((error)=>{
//             console.log(error);
//         }) 
        
//     };
//     const getPlaces = async () =>{
//         setUserId(cookie.get('user_id'))
//         return await API.get('places/all/partner/'+userId).then((response) =>{
//             setPlacesData(JSON.parse(JSON.stringify(response.data)));
//             // console.log(dataCountries);
//         }).catch((error)=>{
//             console.log(error);
//         })     
//     };

//     useEffect(()=>{
//         getPosts();    
//     },[showSendVerification]);


//     useEffect(()=>{
//         getUdm();
//         getQuality();
//         getPlaces();
//         getProducts();
//     },[]);

//     return (<>
//         {/*NAVBAR START*/}
//         {Navbar_all("lock_person","how_to_reg","/login","RoleSelect","Entrar","Registrarse")}
//         {/*NAVBAR END*/}

//         <div>
//             <h1>Mis publicaciones</h1>

//             <div className="container-fluid_">
//                 <div className="mt-3">
//                     <div className="col-md-4 offset-md-4">
//                         <div className="d-grid mx-auto">
//                             <button className="btn btn-dark" >
//                             {/* onClick={() => handleShowModalForm(1)} */}
//                                 <AddCircleOutlineIcon/>Añadir
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="mt-3">
//                     <div className="col-12 col-lg-12 offset-0 offset-lg-12">
//                         <div className="table-responsive">
//                             <table className="table table-bordered">
//                                 <thead>
//                                     <tr>
//                                         {/* <th>id</th> */}
//                                         <th>Precio</th>
//                                         <th>descripción</th>
//                                         <th>Udm</th>
//                                         <th>Calidad</th>
//                                         <th>Producto</th>
//                                         <th>Puesto</th>
//                                         <th>Activa</th>
//                                         <th></th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="table-group-divider">
//                                     {
//                                         postsData.map((post,id)=>(
//                                             <tr key={post._id}>
//                                                 {/* <td>{place._id}</td> */}
//                                                 <td>{post.price}</td>
//                                                 <td>{post.description}</td>
//                                                 <td>{udmData.map((udm,id)=>{
//                                                         if(udm._id === post.udm){
//                                                             return udm.name;
//                                                         }
//                                                     })  
//                                                     }</td>
//                                                 <td>{qualityData.map((quality,id)=>{
//                                                         if(quality._id === post.quality){
//                                                             return quality.name;
//                                                         }
//                                                     })  
//                                                     }</td>

//                                                 <td>{productsData.map((product,id)=>{
//                                                         if(product._id === post.product){
//                                                             return product.name;
//                                                         }
//                                                     })  
//                                                     }</td>

//                                                 <td>{placesData.map((place,id)=>{
//                                                         if(place._id === post.place){
//                                                             return place.name;
//                                                         }
//                                                     })  
//                                                     }</td>
                                                
//                                                 <td>{(post.available === "true") ? ("Activa"):("Desactivada")}</td>
                                                
//                                                 <td>   
//                                                     {/* <button onClick={()=> handleShowModalForm(2,place._id,place.name,place.latitude,place.longitude,place.partner,place.warehouse)}  */}
//                                                     <button  
//                                                     className="btn btn-warning">
//                                                         <i><EditIcon/></i>
//                                                     </button>
//                                                     &nbsp;
//                                                     {/* <button onClick={()=> handleShowModalDelete(place._id,place.number)} className="btn btn-danger"> */}
//                                                     <button className="btn btn-danger">
//                                                         <i><DeleteIcon/></i>
//                                                     </button> 
//                                                     &nbsp;
//                                                     <button className="btn btn-primary">
//                                                         <i><PublishedWithChangesIcon/></i>
//                                                     </button> 
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//             </div>


//             <Modal show={showModalForm} onHide={handleCloseModalForm}>
//                 <ModalHeader closeButton>
//                     <Modal.Title>{title}</Modal.Title>
//                 </ModalHeader>
//                 <ModalBody>
//                     <form className="form mt-0" onSubmit={formik.handleSubmit}>
//                         <div className="input-group mb-3">
//                             <span className="input-group-text"><AttachMoneyIcon/></span>
//                             <input 
//                                 className="form-control"
//                                 type="text" 
//                                 id="price" 
//                                 name= "price"
//                                 placeholder="Precio"
//                                 onChange={formik.handleChange} 
//                                 onBlur={formik.handleBlur}
//                                 value={formik.values.price} 
//                             />
//                         </div >
//                         {formik.touched.price && formik.errors.price ? <div className="error">{formik.errors.price}</div> : null}

//                         <div className="input-group mb-3">
//                             <span className="input-group-text"><DescriptionIcon/></span>
//                             <input 
//                                 className="form-control"
//                                 type="text" 
//                                 id="description" 
//                                 name= "description"
//                                 placeholder="Descripción"
//                                 onChange={formik.handleChange} 
//                                 onBlur={formik.handleBlur}
//                                 value={formik.values.description} 
//                             />
//                         </div >
//                         {formik.touched.description && formik.errors.description ? <div className="error">{formik.errors.description}</div> : null}

//                         <div className="input-group mb-3">
//                             <span className="input-group-text"><ThermostatAutoIcon/></span>
//                             <select name="udm" id="udm" className="form-control" aria-label="Default select example"
//                             // defaultValue={(partnerId === '') ? 'placeholder': partnerId} onChange={formik.handleChange}  onBlur={formik.handleBlur}
//                             >
//                                 <option value='placeholder'disabled>Seleccione unidad de medida</option>
//                                 {udmData.map((udm,id) =>(
//                                     <option key={id} value={udm._id}>{udm.name}</option>
//                                 ))}
//                             </select>
//                         </div>


//                         <div className="input-group mb-3">
//                             <span className="input-group-text"><VolunteerActivismIcon/></span>
//                             <select name="quality" id="quality" className="form-control" aria-label="Default select example"
//                             // defaultValue={(partnerId === '') ? 'placeholder': partnerId} onChange={formik.handleChange}  onBlur={formik.handleBlur}
//                             >
//                                 <option value='placeholder'disabled>Seleccione calidad</option>
//                                 {qualityData.map((quality,id) =>(
//                                     <option key={id} value={quality._id}>{quality.name}</option>
//                                 ))}
//                             </select>
//                         </div>


//                         <div className="input-group mb-3">
//                             <span className="input-group-text"><VolunteerActivismIcon/></span>
//                             <select name="product" id="product" className="form-control" aria-label="Default select example"
//                             // defaultValue={(partnerId === '') ? 'placeholder': partnerId} onChange={formik.handleChange}  onBlur={formik.handleBlur}
//                             >
//                                 <option value='placeholder'disabled>Seleccione producto</option>
//                                 {productsData.map((product,id) =>(
//                                     <option key={id} value={product._id}>{product.name}</option>
//                                 ))}
//                             </select>
//                         </div>


//                         <div className="input-group mb-3">
//                             <span className="input-group-text"><StorefrontIcon/></span>
//                             <select name="place" id="place" className="form-control" aria-label="Default select example"
//                             // defaultValue={(partnerId === '') ? 'placeholder': partnerId} onChange={formik.handleChange}  onBlur={formik.handleBlur}
//                             >
//                                 <option value='placeholder'disabled>Seleccione puesto</option>
//                                 {placesData.map((place,id) =>(
//                                     <option key={id} value={place._id}>{place.name}</option>
//                                 ))}
//                             </select>
//                         </div>
                    
                        
                    
//                         <div> 
//                             <button className="btn btn-success" type="submit"><SaveIcon className="mr-1"/>Guardar</button>
//                         </div>
//                         {error && <p className="error mt-2">{message}</p>}
                    
//                     </form>
//                 </ModalBody>
//             </Modal>



//         </div>
//     </>);
// }
 
// export default Posts;