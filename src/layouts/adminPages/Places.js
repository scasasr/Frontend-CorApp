import React, { useState,useEffect } from "react";
import {Modal, ModalBody, ModalHeader} from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Snackbar,Alert } from "@mui/material";


//Icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AbcIcon from '@mui/icons-material/Abc';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';
import SaveIcon from '@mui/icons-material/Save';
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import StorefrontIcon from '@mui/icons-material/Storefront';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PersonIcon from '@mui/icons-material/Person';


//Conection to API
import API from '../../services/http-common.js';


const Places = () =>{
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [disabledCheck, setDisabledCheck] = useState(false);
    const [checked, setChecked] = useState(false);
    const [title,setTitle] = useState(''); 
    const [operation,setOperation] = useState('');
    const [placeId,setPlaceId] = useState('');
    const [partnerId,setPartnerId] = useState('')
    const [warehouseId,setWarehouseId] = useState('')

    //geolocation
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    //

    const [initialValues,setInitialValues] = useState('');
    const [placeName,setPlaceName] = useState('');
    


    const[placesData,setPlacesData] = useState([]);
    const[warehousesData,setWarehousesData] = useState([]);
    const[partnersData,setPartnersData] = useState([]);


    const[showModalDelete,setShowModalDelete] = useState('');
    
    const handleCloseModalDelete = () => setShowModalDelete(false);

    const handleShowModalDelete = (id,name) => {
        setShowModalDelete(true);
        setPlaceId(id);
        setPlaceName(name)
    }

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
    //  
        

    const [showModalForm, setShowModalForm] = useState(false);

    const handleCloseModalForm = () => setShowModalForm(false);

    const handleShowModalForm =(op,id,placeName,placeLatitude,placeLongitude,bogota,warehouse_id,partner_id,codeWarehouse) =>{
        setShowModalForm(true);
        setWarehouseId(id);

        if(op === 1){
            geolocationVer()
            setTitle('Registrar puesto');
            setOperation('Register');
            setDisabledCheck(false);
            setPartnerId('');
            setWarehouseId('');
            setInitialValues({
                name:'',
                latitude:latitude,
                longitude:longitude,
                is_bogota:'',
                partner:'',
                warehouse:''
            })
        }else if(op === 2){
            setTitle('Editar puesto');
            setOperation('Edit');
            setDisabledCheck(true);
            setChecked(bogota);
            setWarehouseId(warehouse_id);
            setPartnerId(partner_id);
            setInitialValues({
                name:placeName,
                latitude:placeLatitude,
                longitude:placeLongitude,
                is_bogota:bogota,
                partner:partner_id,
                warehouse:warehouse_id
            })

        }
    }



    //Show send verification
    const [showSendVerification, setShowSendVerification] = useState(false);

    const handleCloseSendVerification = () => setShowSendVerification(false);




    const getPlaces = async () =>{
            return await API.get('Places/all').then((response) =>{
            setPlacesData(JSON.parse(JSON.stringify(response.data)));
            // console.log(dataCountries);
        }).catch((error)=>{
            console.log(error);
        })
    };
    
    const getWarehouses = async () =>{
            return await API.get('warehouses/all').then((response) =>{
            setWarehousesData(JSON.parse(JSON.stringify(response.data)));
            // console.log(dataCountries);
        }).catch((error)=>{
            console.log(error);
        })
    };

    const getPartners = async () =>{
        return await API.get('partners/all/vendedor').then((response) =>{
        setPartnersData(JSON.parse(JSON.stringify(response.data)));
        // console.log(dataCountries);
    }).catch((error)=>{
        console.log(error);
    })
    };

    useEffect(()=>{
        getPlaces();    
    },[showSendVerification]);

    useEffect(()=>{
        getWarehouses();
        getPartners();
        geolocationVer();
    },[]);



    const formik  = useFormik({
        enableReinitialize: true,
        initialValues:initialValues,
        validationSchema:Yup.object({
            name:Yup.string().required("Este campo es requerido").matches( /^[a-zA-ZÀ-ÿ\s]{1,40}$/,"Solo permite letras y espacios"),
            latitude:Yup.string().required("Este campo es requerido").matches(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/,"Formato de latitude incorrecto"),
            longitude:Yup.string().required("Este campo es requerido").matches(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}/,"Formato de longitude incorrecto")
        }),
        onSubmit: values =>{
            // console.log('is here ')
            const place_data =JSON.stringify(values, null, 2);

            if(operation === "Register"){
                API.post('places/add',place_data).then((response)=>{
                    if(response.status === 201){
                        formik.resetForm();
                        setShowSendVerification(true);
                    }
                    
                }).catch(error =>{
                    var error_data = error.response.data["error"] ;
                    if(error_data === "Error de servidor" || error_data === "Ya existe este puesto" || error_data === "El id de la bodega no coincide con ninguno registrado"  || error_data === "El id del asociado no coincide con ninguno registrado"){
                        setMessage(error_data);
                        setError(true)
                        setTimeout(() => setError(false),3000);
                    }else{
                        setMessage(error_data);
                        setError(true);  
                        // navigate(("/")); 
                        setTimeout(() => setError(false),3000);
                    }
                });

            }else if(operation === "Edit"){
                API.patch('places/'+placeId,place_data).then((response)=>{
                    if(response.status === 201){
                        // formik.resetForm();
                        // setSendVerification(true);
                        // setTimeout(() => setSendVerification(false),6000);
                        setShowSendVerification(true);
                    }
                    
                }).catch(error =>{
                    var error_data = error.response.data["error"] ;
                    if(error_data === "Error de servidor" || error_data === "No existe una plaza con este id"){
                        setMessage(error_data);
                        setError(true)
                        setTimeout(() => setError(false),4000);
                    }else{
                        setMessage(error_data);
                        setError(true);  
                        // navigate(("/")); 
                        setTimeout(() => setError(false),4000);
                    }
                });
            }
             
        },
    });


    const deletePlace= () =>{
        API.delete('places/'+placeId).then((response)=>{
            if(response.status === 201){
                // formik.resetForm();
                // setSendVerification(true);
                // setTimeout(() => setSendVerification(false),6000);
                setShowSendVerification(true);
                setShowModalDelete(false)
            }
        }).catch(error =>{
            var error_data = error.response.data["error"] ;
            if(error_data === "Error de servidor" || error_data === "No existe un puesto con este id"){
                console.log(error_data);
                // setMessage(error_data);
                // setError(true)
                // setTimeout(() => setError(false),4000);
            }else{
                console.log(error_data);
                // setMessage(error_data);
                // setError(true);  
                // navigate(("/")); 
                // setTimeout(() => setError(false),4000);
            }
        });


    }

    return(
        <>
            <div className="App">
                <h1 className="pt-3">Puestos</h1>
                        <div className="container-fluid">
                            <div className="mt-3">
                                <div className="col-md-4 offset-md-4">
                                    <div className="d-grid mx-auto">
                                        <button className="btn btn-dark" onClick={() => handleShowModalForm(1) }>
                                            <AddCircleOutlineIcon/>Añadir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="col-12 col-lg-12 offset-0 offset-lg-12">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>id</th>
                                                <th>Nombre</th>
                                                <th>Latitude</th>
                                                <th>Longitude</th>
                                                <th>Partner</th>
                                                <th>Warehouse</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider">
                                            {
                                                placesData.map((place,id)=>(
                                                    <tr key={place._id}>
                                                        <td>{place._id}</td>
                                                        <td>{place.name}</td>
                                                        <td>{place.latitude}</td>
                                                        <td>{place.longitude}</td>
                                                        <td>{partnersData.map((partner,id)=>{
                                                                if(partner._id === place.partner){
                                                                    return partner.name+' '+partner.last_name ;
                                                                }
                                                            })  
                                                            }</td>

                                                        <td>{warehousesData.map((warehouse,id)=>{
                                                                if(warehouse._id === place.warehouse){
                                                                    return warehouse.number;
                                                                }
                                                            })  
                                                            }</td>
                                                        
                                                        <td>   
                                                            <button onClick={()=> handleShowModalForm(2,place._id,place.name,place.latitude,place.longitude,place.partner,place.warehouse)} 
                                                            className="btn btn-warning">
                                                                <i><EditIcon/></i>
                                                            </button>
                                                            &nbsp;
                                                            <button onClick={()=> handleShowModalDelete(place._id,place.number)} className="btn btn-danger">
                                                                <i><DeleteIcon/></i>
                                                            </button>  
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    </div>
                    <Modal show={showModalForm} onHide={handleCloseModalForm}>
                        <ModalHeader closeButton>
                            <Modal.Title>{title}</Modal.Title>
                        </ModalHeader>
                        <ModalBody>
                            <form className="form mt-0" onSubmit={formik.handleSubmit}>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"><StorefrontIcon/></span>
                                    <input 
                                        className="form-control"
                                        type="text" 
                                        id="name" 
                                        name= "name"
                                        placeholder="Nombre del puesto"
                                        onChange={formik.handleChange} 
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name} 
                                    />
                                </div >
                                {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><MyLocationIcon /></span>
                                    <input 
                                        className="form-control"
                                        type="text" 
                                        id="latitude" 
                                        name= "latitude"
                                        placeholder="latitud del puesto"
                                        onChange={formik.handleChange} 
                                        onBlur={formik.handleBlur}
                                        value={formik.values.latitude} 
                                    />
                                </div >
                                {formik.touched.latitude && formik.errors.latitude ? <div className="error">{formik.errors.latitude}</div> : null}

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><MyLocationIcon /></span>
                                    <input 
                                        className="form-control"
                                        type="text" 
                                        id="longitude" 
                                        name= "longitude"
                                        placeholder="Longitud del puesto"
                                        onChange={formik.handleChange} 
                                        onBlur={formik.handleBlur}
                                        value={formik.values.longitude} 
                                    />
                                </div >
                                {formik.touched.longitude && formik.errors.longitude ? <div className="error">{formik.errors.longitude}</div> : null}
                            
                                <div className="input-group mb-3">
                                    <span className="input-group-text"><LocationCityIcon /></span>
                                    Es Bogotá:
                                    <input 
                                        className="form-control"
                                        type="checkbox" 
                                        id="is_bogota" 
                                        name= "is_bogota"
                                        onChange={formik.handleChange} 
                                        onBlur={formik.handleBlur}
                                        value={formik.values.is_bogota} 
                                        disabled = {disabledCheck}/>
                                    
                                </div >
                                
                                <div className="input-group mb-3">
                                    <span className="input-group-text"><PersonIcon/></span>
                                    <select name="partner" id="partner" className="form-control" aria-label="Default select example"
                                    defaultValue={(partnerId === '') ? 'placeholder': partnerId} onChange={formik.handleChange}  onBlur={formik.handleBlur}>
                                        <option value='placeholder'disabled>Seleccione un vendedor</option>
                                        {partnersData.map((partner,id) =>(
                                            <option key={id} value={partner._id}>{partner.name+' '+partner.last_name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text"><LocalConvenienceStoreIcon/></span>
                                    <select name="warehouse" id="warehouse" className="form-control" aria-label="Default select example"
                                    defaultValue={(warehouseId === '') ? 'placeholder': warehouseId} onChange={formik.handleChange}  onBlur={formik.handleBlur}>
                                        <option value='placeholder'disabled>Seleccione una bodega</option>
                                        {warehousesData.map((warehouse,id) =>(
                                            <option key={id} value={warehouse._id}>{warehouse.number+'---'}id:{warehouse._id}</option>
                                        ))}
                                    </select>
                                </div>
                            
                                <div> 
                                    <button className="btn btn-success" type="submit"><SaveIcon className="mr-1"/>Guardar</button>
                                </div>
                                {error && <p className="error mt-2">{message}</p>}
                            
                            </form>
                        </ModalBody>
                    </Modal>
                    {/* successful form submission information */}
                    <Snackbar open={showSendVerification} autoHideDuration={6000} onClose={handleCloseSendVerification}>
                        <Alert onClose={handleCloseSendVerification} severity="success" sx={{ width: '100%' }}>
                            Formulario enviado con exito
                        </Alert>
                    </Snackbar>
                     {/* clients deletion confirmation modal*/}
                    <Modal show={showModalDelete} onHide={handleCloseModalDelete}>
                        <ModalHeader closeButton>
                                <Modal.Title><HelpIcon/> Eliminar puesto</Modal.Title>
                        </ModalHeader>
                        <ModalBody>
                            <div className="Container">
                                <h5 className="mb-3">¿Está seguro que desea eliminar este puesto con</h5>
                                <h5>Número: {placeName}</h5>
                                <h5 className="mb-2">Id: {placeId}</h5>
                            </div>
                            <div className="d-flex justify-content-around mt-3">
                                <button onClick={deletePlace} className="btn btn-success"><CheckIcon/>SI</button>
                                <button onClick={handleCloseModalDelete} className="btn btn-danger"><CloseIcon/>NO</button>
                            </div>

                        </ModalBody>
                    </Modal>
                </div>
        </>
    );
};

export default Places;