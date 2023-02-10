import React, { useState,useEffect } from "react";
import {Modal, ModalBody, ModalHeader} from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Snackbar,Alert } from "@mui/material";


//Icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';
import SaveIcon from '@mui/icons-material/Save';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';

//Conection to API
import API from '../../services/http-common.js';

const Udm = () =>{

    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [title,setTitle] = useState(''); 
    const [operation,setOperation] = useState('');
    const [udmId,setUdmId] = useState('');
    const [dataUdm,setDataUdm] = useState([]);
    const [initialValues,setInitialValues] = useState('');
    const [udmName,setUdmName] = useState('');


    const[showModalDelete,setShowModalDelete] = useState('');
    
    const handleCloseModalDelete = () => setShowModalDelete(false);

    const handleShowModalDelete = (id,name) => {
        setShowModalDelete(true);
        setUdmId(id);
        setUdmName(name);
    }
    


    const [showModalForm, setShowModalForm] = useState(false);

    const handleCloseModalForm = () => setShowModalForm(false);

    const handleShowModalForm =(op,id, nameUdm) =>{
        setShowModalForm(true);
        setUdmId(id);

        if(op === 1){
            setTitle('Registrar categoria');
            setOperation('Register');
            setInitialValues({
                name:""
            })
        }else if(op === 2){
            setTitle('Editar categoria');
            setOperation('Edit');
            setInitialValues({
                name:nameUdm
            })

        }
    }


    //Show send verification
    const [showSendVerification, setShowSendVerification] = useState(false);

    const handleCloseSendVerification = () => setShowSendVerification(false);


    const getUdm = async () =>{
            return await API.get('udm/all').then((response) =>{
            setDataUdm(JSON.parse(JSON.stringify(response.data)));
            // console.log(dataUdm);
        }).catch((error)=>{
            console.log(error);
        })
    };

    useEffect(()=>{
        getUdm();
    },[showSendVerification]);

    const formik  = useFormik({
        enableReinitialize: true,
        initialValues:initialValues,
        validationSchema:Yup.object({
            name:Yup.string().required("Este campo es requerido").matches( /^[a-zA-ZÀ-ÿ\s]{1,40}$/,"Solo permite letras y espacios")
        }),
        onSubmit: values =>{
            const udm_data =JSON.stringify(values, null, 2);

            if(operation === "Register"){
                API.post('udm/add',udm_data).then((response)=>{
                    if(response.status === 201){
                        formik.resetForm();
                        setShowSendVerification(true);
                    }
                    
                }).catch(error =>{
                    var error_data = error.response.data["error"] ;
                    if(error_data === "Error de servidor" || error_data === "Ya existe esta unidad de medida"){
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
                API.patch('udm/'+udmId,udm_data).then((response)=>{
                    if(response.status === 201){
                        // formik.resetForm();
                        // setSendVerification(true);
                        // setTimeout(() => setSendVerification(false),6000);
                        setShowSendVerification(true);
                    }
                    
                }).catch(error =>{
                    var error_data = error.response.data["error"] ;
                    if(error_data === "Error de servidor" || error_data === "No existe una unidad de medida con este id"){
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

    const deleteUdm= () =>{
        API.delete('udm/'+udmId).then((response)=>{
            if(response.status === 201){
                // formik.resetForm();
                // setSendVerification(true);
                // setTimeout(() => setSendVerification(false),6000);
                setShowSendVerification(true);
                setShowModalDelete(false)
            }
        }).catch(error =>{
            var error_data = error.response.data["error"] ;
            if(error_data === "Error de servidor" || error_data === "No existe una unidad de medida con este id"){
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
                <h1 className="pt-3">Unidad de medida</h1>
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
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {
                                            dataUdm.map((udm,id)=>(
                                                <tr key={udm._id}>
                                                    <td>{udm._id}</td>
                                                    <td>{udm.name}</td>
                                                    <td>   
                                                        <button onClick={()=> handleShowModalForm(2,udm._id,udm.name)} 
                                                        className="btn btn-warning">
                                                            <i><EditIcon/></i>
                                                        </button>
                                                        &nbsp;
                                                        <button onClick={() => handleShowModalDelete(udm._id,udm.name)} className="btn btn-danger">
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
                                <span className="input-group-text"><ThermostatAutoIcon /></span>
                                <input 
                                    className="form-control"
                                    type="text" 
                                    id="name" 
                                    name= "name"
                                    placeholder="Nombre de la unidad de medida"
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name} 
                                />
                            </div >
                            {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
                
                        
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
                            <Modal.Title><HelpIcon/> Eliminar unidad de medida</Modal.Title>
                    </ModalHeader>
                    <ModalBody>
                        <div className="Container">
                            <h5 className="mb-3">¿Está seguro que desea eliminar esta udm con</h5>
                            <h5 className="mb-2">Id: {udmId}</h5>
                            <h5>Nombre: {udmName}</h5>
                            
                        </div>
                        <div className="d-flex justify-content-around mt-3">
                            <button onClick={deleteUdm} className="btn btn-success"><CheckIcon/>SI</button>
                            <button onClick={handleCloseModalDelete} className="btn btn-danger"><CloseIcon/>NO</button>
                        </div>

                    </ModalBody>
                </Modal>
            </div>
        
        </>)

};

export default Udm;