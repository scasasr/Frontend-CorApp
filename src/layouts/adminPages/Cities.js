import React, { useState,useEffect } from "react";
import {Modal, ModalBody, ModalHeader} from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Snackbar,Alert } from "@mui/material";


//Icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FlagIcon from '@mui/icons-material/Flag';
import AbcIcon from '@mui/icons-material/Abc';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';
import SaveIcon from '@mui/icons-material/Save';
import SignpostIcon from '@mui/icons-material/Signpost';

//Conection to API
import API from '../../services/http-common.js';


const Cities = () =>{

    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [title,setTitle] = useState(''); 
    const [operation,setOperation] = useState('');
    const [cityId,setCityId] = useState('');
    const [countryId,setCountryId] = useState('')

    const [initialValues,setInitialValues] = useState('');
    const [cityName,setCityName] = useState('');
    const [cityCode,setCityCode] = useState('');


    const[countriesData,setCountiresData] = useState([]);
    const[citiesData,setCitiesData] = useState([]);


    const[showModalDelete,setShowModalDelete] = useState('');
    
    const handleCloseModalDelete = () => setShowModalDelete(false);

    const handleShowModalDelete = (id,name,code) => {
        setShowModalDelete(true);
        setCityId(id);
        setCityName(name);
        setCityCode(code);
    }


    const [showModalForm, setShowModalForm] = useState(false);

    const handleCloseModalForm = () => setShowModalForm(false);

    const handleShowModalForm =(op,id,nameCity,idCountry,codeCity) =>{
        setShowModalForm(true);
        setCityId(id);

        if(op === 1){
            setTitle('Registrar ciudad');
            setOperation('Register');
            setCountryId('');
            setInitialValues({
                name:'',
                country:'',
                code:''
            })
        }else if(op === 2){
            setTitle('Editar pais');
            setOperation('Edit');
            setCountryId(idCountry);
            setInitialValues({
                name:nameCity,
                country:idCountry,
                code:codeCity
            })

        }
    }



    //Show send verification
    const [showSendVerification, setShowSendVerification] = useState(false);

    const handleCloseSendVerification = () => setShowSendVerification(false);




    const getCountries = async () =>{
            return await API.get('countries/all').then((response) =>{
            setCountiresData(JSON.parse(JSON.stringify(response.data)));
            // console.log(dataCountries);
        }).catch((error)=>{
            console.log(error);
        })
    };
    
    const getCities = async () =>{
            return await API.get('cities/all').then((response) =>{
            setCitiesData(JSON.parse(JSON.stringify(response.data)));
            // console.log(dataCountries);
        }).catch((error)=>{
            console.log(error);
        })
    };

    useEffect(()=>{
        getCities();
    },[showSendVerification]);
     
    useEffect(() =>{
        getCountries();
    },[])



    const formik  = useFormik({
        enableReinitialize: true,
        initialValues:initialValues,
        validationSchema:Yup.object({
            name:Yup.string().required("Este campo es requerido").matches( /^[a-zA-ZÀ-ÿ\s]{1,40}$/,"Solo permite letras y espacios"),
            code:Yup.string().required("Este campo es requerido").min(5,"Codigo menor a 5 digitos").max(5,"Codigo excede los 5 digitos")
        }),
        onSubmit: values =>{
            // console.log('is here ')
            const city_data =JSON.stringify(values, null, 2);

            if(operation === "Register"){
                API.post('cities/add',city_data).then((response)=>{
                    if(response.status === 201){
                        formik.resetForm();
                        setShowSendVerification(true);
                    }
                    
                }).catch(error =>{
                    var error_data = error.response.data["error"] ;
                    if(error_data === "Error de servidor" || error_data === "Ya existe esta ciudad" || error_data === "El id del pais no coincide con ninguno registrado"){
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
                API.patch('cities/'+cityId,city_data).then((response)=>{
                    if(response.status === 201){
                        // formik.resetForm();
                        // setSendVerification(true);
                        // setTimeout(() => setSendVerification(false),6000);
                        setShowSendVerification(true);
                    }
                    
                }).catch(error =>{
                    var error_data = error.response.data["error"] ;
                    if(error_data === "Error de servidor" || error_data === "No existe una ciudad con este id"){
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


    const deleteCity= () =>{
        API.delete('cities/'+cityId).then((response)=>{
            if(response.status === 201){
                // formik.resetForm();
                // setSendVerification(true);
                // setTimeout(() => setSendVerification(false),6000);
                setShowSendVerification(true);
                setShowModalDelete(false)
            }
        }).catch(error =>{
            var error_data = error.response.data["error"] ;
            if(error_data === "Error de servidor" || error_data === "No existe un país con este id"){
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
                <h1 className="pt-3">Ciudades</h1>
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
                                                <th>País</th>
                                                <th>Código</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider">
                                            {
                                                citiesData.map((city,id)=>(
                                                    <tr key={city._id}>
                                                        <td>{city._id}</td>
                                                        <td>{city.name}</td>
                                                        <td>{countriesData.map((country,id)=>{
                                                                if(country._id === city.country){
                                                                    return country.name;
                                                                }
                                                            })  
                                                            }</td>
                                                        <td>{city.code}</td>
                                                        <td>   
                                                            <button onClick={()=> handleShowModalForm(2,city._id,city.name,city.country,city.code)} 
                                                            className="btn btn-warning">
                                                                <i><EditIcon/></i>
                                                            </button>
                                                            &nbsp;
                                                            <button onClick={()=> handleShowModalDelete(city._id,city.name,city.code)} className="btn btn-danger">
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
                                    <span className="input-group-text"><SignpostIcon/></span>
                                    <input 
                                        className="form-control"
                                        type="text" 
                                        id="name" 
                                        name= "name"
                                        placeholder="Nombre de la ciudad"
                                        onChange={formik.handleChange} 
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name} 
                                    />
                                </div >
                                {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
                            
                                <div className="input-group mb-3">
                                    <span className="input-group-text"><FlagIcon/></span>
                                    <select name="country" id="country" className="form-control" aria-label="Default select example"
                                    defaultValue={(countryId === '') ? 'placeholder': countryId} onChange={formik.handleChange}  onBlur={formik.handleBlur}>
                                        <option value='placeholder'disabled>Seleccione un país</option>
                                        {countriesData.map((country,id) =>(
                                            <option key={id} value={country._id}>{country.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="input-group mb-3">
                                <span className="input-group-text"><AbcIcon/></span>
                                    <input 
                                        className="form-control"
                                        type="text" 
                                        id="code" 
                                        name= "code" 
                                        placeholder="Código"
                                        onChange={formik.handleChange}
                                        
                                        value={formik.values.code} 
                                    />
                                </div>
                                {formik.touched.code && formik.errors.code ? <div className="error">{formik.errors.code}</div> : null}
                            
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
                                <Modal.Title><HelpIcon/> Eliminar país</Modal.Title>
                        </ModalHeader>
                        <ModalBody>
                            <div className="Container">
                                <h5 className="mb-3">¿Está seguro que desea eliminar este pais con</h5>
                                <h5>Nombre: {cityName}</h5>
                                <h5 className="mb-2">Código: {cityCode}</h5>
                            </div>
                            <div className="d-flex justify-content-around mt-3">
                                <button onClick={deleteCity} className="btn btn-success"><CheckIcon/>SI</button>
                                <button onClick={handleCloseModalDelete} className="btn btn-danger"><CloseIcon/>NO</button>
                            </div>

                        </ModalBody>
                    </Modal>
                </div>
        </>
    );

};

export default Cities;