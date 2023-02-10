import React, { useState,useEffect } from "react";
import {Modal, ModalBody, ModalHeader} from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Snackbar,Alert } from "@mui/material";

//Conection to API
import API from '../../services/http-common.js';


//Icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SaveIcon from '@mui/icons-material/Save';
import PasswordIcon from '@mui/icons-material/Password';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';

const Clients = (role) => {
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [dataClients,setDataClients] = useState([]);
    const [title,setTitle] = useState(''); 
    const [operation,setOperation] = useState('');
    const [userId,setUserId] = useState('');
    const [userName,setUSerName] = useState('');
    const [document,setDocument] = useState('');
    const [initialValues,setInitialValues] = useState('');
    const [yupSchema,setYupSchema] = useState(Yup.object({}));

     //Show send verification
     const [showSendVerification, setShowSendVerification] = useState(false);

     const handleCloseSendVerification = () => setShowSendVerification(false);


    let roleName=role.role
    const url='/partners/all/'+roleName
    


    const [showModalForm, setShowModalForm] = useState(false);

    const handleCloseModalForm = () => setShowModalForm(false);

    const handleShowModalForm = (op,id,name_,lastname_,documentNumber_,email_,phone_,username_,accountNumber_) => {
        setShowModalForm(true);
        setUserId(id);
        if(op === 1){
            setTitle('Registrar '+roleName);
            setOperation('Register');
            if(roleName === "vendedor"){
                setInitialValues({
                    name:"",
                    last_name:"",
                    document_number:"",
                    email:"",
                    username:"",
                    password:"",
                    passwordVerification:"",
                    phone:"",
                    role_name:roleName,
                    document_type:'',
                    account_number:''
                })  

                setYupSchema(Yup.object({
                    name:Yup.string().required("Este campo es requerido").matches( /^[a-zA-ZÀ-ÿ\s]{1,40}$/,"Solo permite letras y espacios"),
                    last_name:Yup.string().required("Este campo es requerido").matches( /^[a-zA-ZÀ-ÿ\s]{1,40}$/,"Solo permite letras y espacios"),
                    document_number:Yup.string().required("Este campo es requerido").matches(/^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/,"Numero de cedula no valido"),
                    email:Yup.string().email("Formato de email incorrecto").required("Este campo es requerido"),
                    username:Yup.string().required("Este campo es requerido"),
                    account_number:Yup.string().required("Este campo es requerido"),
                    password:Yup.string().required("Este campo es requerido").min(8,"La contraseña es muy corta").max(25),
                    passwordVerification:Yup.string().required("Este campo es requerido").min(8,"La contraseña es muy corta").max(25).oneOf([Yup.ref("password")],"Las contraseñas no coinciden"),
                    phone:Yup.string().required("Este campo es requerido").min(10,"número invalido: menos de 10 digitos").max(10,"número invalido: más de 10 digitos")

                }))

            }else{
                setInitialValues({
                    name:"",
                    last_name:"",
                    document_number:"",
                    email:"",
                    username:"",
                    password:"",
                    passwordVerification:"",
                    phone:"",
                    role_name:roleName,
                    document_type:''
                })

                setYupSchema(Yup.object({
                    name:Yup.string().required("Este campo es requerido").matches( /^[a-zA-ZÀ-ÿ\s]{1,40}$/,"Solo permite letras y espacios"),
                    last_name:Yup.string().required("Este campo es requerido").matches( /^[a-zA-ZÀ-ÿ\s]{1,40}$/,"Solo permite letras y espacios"),
                    document_number:Yup.string().required("Este campo es requerido").matches(/^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/,"Numero de cedula no valido"),
                    email:Yup.string().email("Formato de email incorrecto").required("Este campo es requerido"),
                    username:Yup.string().required("Este campo es requerido"),
                    password:Yup.string().required("Este campo es requerido").min(8,"La contraseña es muy corta").max(25),
                    passwordVerification:Yup.string().required("Este campo es requerido").min(8,"La contraseña es muy corta").max(25).oneOf([Yup.ref("password")],"Las contraseñas no coinciden"),
                    phone:Yup.string().required("Este campo es requerido").min(10,"número invalido: menos de 10 digitos").max(10,"número invalido: más de 10 digitos")

                }))
            }
             
        }else if(op === 2){
            setOperation('Edit');
            setTitle('Editar '+roleName);
            setUserId(id)
            // console.log(operation)
            if(roleName === "vendedor"){
                setInitialValues({
                    name:name_,
                    last_name:lastname_,
                    document_number:documentNumber_,
                    email:email_,
                    username:username_,
                    phone:phone_,
                    account_number:accountNumber_
                })  

                setYupSchema(Yup.object({
                    name:Yup.string().required("Este campo es requerido").matches( /^[a-zA-ZÀ-ÿ\s]{1,40}$/,"Solo permite letras y espacios"),
                    last_name:Yup.string().required("Este campo es requerido").matches( /^[a-zA-ZÀ-ÿ\s]{1,40}$/,"Solo permite letras y espacios"),
                    document_number:Yup.string().required("Este campo es requerido").matches(/^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/,"Numero de cedula no valido"),
                    email:Yup.string().email("Formato de email incorrecto").required("Este campo es requerido"),
                    username:Yup.string().required("Este campo es requerido"),
                    account_number:Yup.string().required("Este campo es requerido"),
                    phone:Yup.string().required("Este campo es requerido").min(10,"número invalido: menos de 10 digitos").max(10,"número invalido: más de 10 digitos")

                }))

            }else{
                setInitialValues({
                    name:name_,
                    last_name:lastname_,
                    document_number:documentNumber_,
                    email:email_,
                    username:username_,
                    phone:phone_
                })

                setYupSchema(Yup.object({
                    name:Yup.string().required("Este campo es requerido").matches( /^[a-zA-ZÀ-ÿ\s]{1,40}$/,"Solo permite letras y espacios"),
                    last_name:Yup.string().required("Este campo es requerido").matches( /^[a-zA-ZÀ-ÿ\s]{1,40}$/,"Solo permite letras y espacios"),
                    document_number:Yup.string().required("Este campo es requerido").matches(/^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/,"Numero de cedula no valido"),
                    email:Yup.string().email("Formato de email incorrecto").required("Este campo es requerido"),
                    username:Yup.string().required("Este campo es requerido"),
                    phone:Yup.string().required("Este campo es requerido").min(10,"número invalido: menos de 10 digitos").max(10,"número invalido: más de 10 digitos")

                }))


            }
             
        }

        

    };


    const [showModalDelete, setShowModalDelete] = useState(false);

    const handleCloseModalDelete = () => setShowModalDelete(false);
    
    const handleShowModalDelete = (id,name_,lastname_,documentNumber_) =>{
        setShowModalDelete(true);
        setUserId(id);
        setUSerName(name_+' '+lastname_);
        setDocument(documentNumber_)
    }

    

    const getClients = async () =>{
            return await API.get(url).then((response) =>{
            setDataClients(JSON.parse(JSON.stringify(response.data)));
            // console.log(dataClients);
        }).catch((error)=>{
            console.log(error);
        })
    };

    useEffect(()=>{
        getClients();
    },[showSendVerification]);


    // console.log(initialValues);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues, 
        validationSchema:yupSchema,
        onSubmit: (values) => {
            const data =JSON.stringify(values, null, 2)
            if(operation === "Register"){
                API.post('partners/add',data).then((response)=>{
                    if(response.status === 201){
                        formik.resetForm();
                        setShowSendVerification(true);
                        // setSendVerification(true);
                        // setTimeout(() => setSendVerification(false),6000);
                        
                    }
                    
                }).catch(error =>{
                    var error_data = error.response.data["error"] ;
                    if(error_data === "Error de servidor" || error_data === "El id del role no coincide con ninguno registrado"|| error_data === "Ya existe este usuario"){
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

            }else if(operation === "Edit"){
                API.patch('partners/'+userId,data).then((response)=>{
                    if(response.status === 201){
                        // formik.resetForm();
                        // setSendVerification(true);
                        // setTimeout(() => setSendVerification(false),6000);
                        setShowSendVerification(true);
                    }
                    
                }).catch(error =>{
                    var error_data = error.response.data["error"] ;
                    if(error_data === "Error de servidor" || error_data === "No existe un asociado con este id"){
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

    })

    const deleteUser = () =>{
        API.delete('partners/'+userId).then((response)=>{
            if(response.status === 201){
                // formik.resetForm();
                // setSendVerification(true);
                // setTimeout(() => setSendVerification(false),6000);
                setShowSendVerification(true);
                setShowModalDelete(false)
            }
        }).catch(error =>{
            var error_data = error.response.data["error"] ;
            if(error_data === "Error de servidor" || error_data === "No existe un asociado con este id"){
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
            <h1 className="pt-3">Clientes :  {role.role}</h1>
                <div className="container-fluid_">
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
                                        <th>Documento</th>
                                        <th># documento</th>
                                        <th>Nombre</th>
                                        <th>Email</th>
                                        <th>Telefono</th>
                                        {(roleName ==="vendedor") ? (<th># cuenta</th>):(<></>)}
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {
                                        dataClients.map((client,id)=>(
                                            <tr key={client._id}>
                                                <td>{client.document_type}</td>
                                                <td>{client.document_number}</td>
                                                <td>{client.name +" "+client.last_name}</td>
                                                <td>{client.email}</td>
                                                <td>{client.phone}</td>
                                                {(roleName==="vendedor") ? (<td>{client.account_number}</td>):(<></>)}
                                                <td>   
                                                    <button onClick={()=> handleShowModalForm(2,client._id,client.name,client.last_name,client.document_number,
                                                    client.email,client.phone,client.username,client.account_number)} 
                                                    className="btn btn-warning">
                                                        <i><EditIcon/></i>
                                                    </button>
                                                    &nbsp;
                                                    <button onClick={()=>handleShowModalDelete(client._id,client.name,client.last_name,client.document_number    )} 
                                                    className="btn btn-danger">
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
            {/* Creation and editing modal */}
            <Modal show={showModalForm} onHide={handleCloseModalForm}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form className="form mt-0" onSubmit={formik.handleSubmit}>
                    <div className="input-group mb-3">
                        <span className="input-group-text"><PersonIcon/></span>
                        <input 
                            className="form-control"
                            type="text" 
                            id="name" 
                            name= "name"
                            placeholder="Nombres"
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                            value={formik.values.name} 
                        />
                    </div >
                    {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
                   
                    <div className="input-group mb-3">
                    <span className="input-group-text"><PersonIcon/></span>
                        <input 
                            className="form-control"
                            type="text" 
                            id="last_name" 
                            name= "last_name" 
                            placeholder="Apellidos"
                            onChange={formik.handleChange} 
                            value={formik.values.last_name} 
                        />
                    </div>
                    {formik.touched.last_name && formik.errors.last_name ? <div className="error">{formik.errors.last_name}</div> : null}
                    
                    {(operation === 'Register') ? 
                    (<>
                        <div className="input-group mb-3">
                            <span className="input-group-text"><BadgeIcon/></span>
                            <select name="document_type" id="document_type" className="form-control" aria-label="Default select example"
                             defaultValue='placeholder' onChange={formik.handleChange}  onBlur={formik.handleBlur}>
                                <option value='placeholder' disabled>Tipo de documento</option>
                                <option value="C.C">C.C</option>
                                <option value="T.I">T.I</option>
                                <option value="NIT">NIT</option>
                            </select>
                        </div>
                    </>):(<></>)}
                
                    <div className="input-group mb-3">
                        <span className="input-group-text"><BadgeIcon/></span>
                        <input 
                            className="form-control"
                            type="number"
                            id="document_number" 
                            name= "document_number" 
                            placeholder="Número de documento"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.document_number} 
                        />
                    </div> 
                    {formik.touched.document_number && formik.errors.document_number ? <div className="error">{formik.errors.document_number}</div> : null}
                    <div className="input-group mb-3">
                        <span className="input-group-text"><MailIcon/></span>
                        <input 
                            className="form-control"
                            type="text" 
                            id="email" 
                            name= "email" 
                            placeholder="Correo electrónico"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email} 
                        />
                    </div>
                    {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
                   
                    <div className="input-group mb-3">
                        <span className="input-group-text"><ContactPhoneIcon/></span>
                        <input 
                            className="form-control"
                            type="number" 
                            id="phone" 
                            name= "phone" 
                            placeholder="Teléfono"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}   
                        />
                    </div>
                    {formik.touched.phone && formik.errors.phone ? <div className="error">{formik.errors.phone}</div> : null}
                    
                    <div className="input-group mb-3">
                        <span className="input-group-text"><SentimentSatisfiedAltIcon /></span>
                        <input 
                            className="form-control"
                            type="text" 
                            id="username" 
                            name= "username" 
                            placeholder="Nombre de usuario"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}    
                        />
                    </div>
                    {formik.touched.username && formik.errors.username ? <div className="error">{formik.errors.username}</div> : null}

                    {(roleName === 'vendedor') ? 
                    (<>

                    <div className="input-group mb-3">
                        <span className="input-group-text"><PaymentIcon/></span>
                        <input 
                            className="form-control"
                            type="number" 
                            id="account_number" 
                            name= "account_number" 
                            placeholder="Número de cuenta bancaria"
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                            value={formik.values.account_number}
                        />
                    </div>
                    {formik.touched.account_number && formik.errors.account_number ? <div className="error">{formik.errors.account_number}</div> : null} 

                    </>)
                    :(<></>)}
                    {/* Add passwords fiel if operation is equal to Register */}
                    {(operation === 'Register') ? (
                        <>
                        <div className="input-group mb-3">
                            <span className="input-group-text"><SupervisorAccountIcon/></span>
                            <input 
                                className="form-control"
                                type="text" 
                                id="role_name" 
                                name= "role_name" 
                                defaultValue={formik.values.role_name} 
                                disabled  
                            />
                        </div>
                        
                        <div className="input-group mb-3">
                            <span className="input-group-text"><PasswordIcon/></span>
                            <input 
                                className="form-control"
                                type="password" 
                                id="password" 
                                name= "password" 
                                placeholder="Contraseña"
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                        </div>
                        {formik.touched.password && formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
                        <div className="input-group mb-3">
                            <span className="input-group-text"><PasswordIcon/></span>
                            <input 
                                className="form-control"
                                type="password" 
                                id="passwordVerification" 
                                name= "passwordVerification" 
                                placeholder="Confirma la contraseña"
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}
                                value={formik.values.passwordVerification || ''}
                            />
                        </div>
                        {formik.touched.passwordVerification && formik.errors.passwordVerification ? <div className="error mb-2">{formik.errors.passwordVerification}</div> : null}
                        </>
                        ):
                    (<></>)} 
                    <div> 
                        <button className="btn btn-success" type="submit"><SaveIcon className="mr-1"/>Guardar</button>
                    </div>
                    {error && <p className="error mt-2">{message}</p>}
                </form>
                </Modal.Body>
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
                        <Modal.Title><HelpIcon/> Eliminar {roleName}</Modal.Title>
                </ModalHeader>
                <ModalBody>
                    <div className="Container">
                        <h5 className="mb-3">¿Está seguro que desea eliminar este {roleName} con</h5>
                        <h5>Nombre: {userName}</h5>
                        <h5 className="mb-2">Número de documento: {document}</h5>
                    </div>
                    <div className="d-flex justify-content-around mt-3">
                        <button onClick={deleteUser} className="btn btn-success"><CheckIcon/>SI</button>
                        <button onClick={handleCloseModalDelete} className="btn btn-danger"><CloseIcon/>NO</button>
                    </div>

                </ModalBody>
            </Modal>
        </div>
        </>
    );
};

export default Clients;