import React from "react";
import Navbar_all from '../components/Navbar.js'
import { useState } from "react";
import { Link,useNavigate} from "react-router-dom";

import { Nav,Modal } from 'react-bootstrap';
import { Container,Snackbar,Alert } from "@mui/material";

//Conecction to API-rest
import API from '../services/http-common.js'

//images
import logo from '../assets/logo.png';

//cookie component import
import Cookies from "universal-cookie";

//form validation
import { useFormik} from "formik";
import * as Yup from 'yup';

const Register = () =>{

    var cookie = new Cookies();

    let role_name=cookie.get('role');

    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [sendVerification,setSendVerification] = useState(false);

    const navigate = useNavigate();

    const [role, setRole] = useState([]);

    //Show login verification
    const [showLoginVerification, setShowLoginVerification] = useState(false);

    const handleCloseLoginVerification = () => setShowLoginVerification(false);
    const handleShowLoginVerification = () => setShowLoginVerification(true);



    const formik = useFormik({
        initialValues: {
            name:'',
            last_name:'',
            document_number:'',
            email:'',
            username:'',
            password:"",
            passwordVerification:"",
            phone:'',
            role:role_name,
            document_type:''
        },
        validationSchema:Yup.object({
            name:Yup.string().required("Este campo es requerido").matches( /^[a-zA-ZÀ-ÿ\s]{1,40}$/,"Solo permite letras y espacios"),
            last_name:Yup.string("Este campo solo acepta numeros").required("Este campo es requerido").matches( /^[a-zA-ZÀ-ÿ\s]{1,40}$/,"Solo permite letras y espacios"),
            document_number:Yup.string().required("Este campo es requerido").min(7,"número invalido: menos de 6 digitos").max(10,"número invalido: más de 10 digitos"),
            email:Yup.string().email("Formato de email incorrecto").required("Este campo es requerido"),
            username:Yup.string().required("Este campo es requerido"),
            password:Yup.string().required("Este campo es requerido").min(8,"La contraseña es muy corta").max(25),
            passwordVerification:Yup.string().required("Este campo es requerido").min(8,"La contraseña es muy corta").max(25).oneOf([Yup.ref("password")],"Las contraseñas no coinciden"),
            phone:Yup.string().required("Este campo es requerido").min(10,"número invalido: menos de 10 digitos").max(10,"número invalido: más de 10 digitos"),

            

        }),
        onSubmit: values => {
            // // console.log(values)
            // const partner_data =JSON.stringify(values, null, 2)
            // API.post('partners/add',partner_data).then((response)=>{
            //     if(response.status === 201){
            //         formik.resetForm();
            //         setSendVerification(true);
            //         setTimeout(() => setSendVerification(false),3000);
            //     }
                
            // }).catch(error =>{
            //     var error_data = error.response.data["error"] ;
            //     if(error_data === "Error de servidor" || error_data === "El id del role no coincide con ninguno registrado"|| error_data === "Ya existe este usuario"){
            //         setMessage(error_data);
            //         setError(true)
            //         setTimeout(() => setError(false),3000);
            //     }else{
            //         setMessage(error_data);
            //         setError(true);  
            //         navigate(("/")); 
            //         setTimeout(() => setError(false),3000);
            //     }
            // });
            
          
        },
      });

    return(
        <>
        {/*NAVBAR START*/}
            {Navbar_all("arrow_back","assignment_ind","/","/login","Volver","Entrar")}
        {/*NAVBAR END*/}


        {/* FORM REGISTER START */}
        <div class="style-background register_cont">
            <h1 class="mt-2">Registrarse</h1>
            <h1>{cookie.get('role')}</h1>
            <Container class ="register-mt" >
                <form className="form_style" onSubmit={formik.handleSubmit}>
                    
                    <div>
                        <label htmlFor="name">Nombre</label>
                        <input 
                            type="text" 
                            id="name" 
                            name= "name"
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                            value={formik.values.name} 
                        />
                    </div>
                    {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
                    <div>
                        <label htmlFor="last_name">Apellidos</label>
                        <input 
                            type="text" 
                            id="last_name" 
                            name= "last_name" 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.last_name} 
                        />
                    </div>
                    {formik.touched.last_name && formik.errors.last_name ? <div className="error">{formik.errors.last_name}</div> : null}
                    <div>
                        <label htmlFor="document_type">Tipo de documento</label>
                        <select name="document_type" id="document_type" className="form-select" aria-label="Default select example"
                        onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.document_type}>
                            <option selected>Seleccionar uno</option>
                            <option value="C.C">C.C</option>
                            <option value="T.I">T.I</option>
                            <option value="NIT">NIT</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="document_number">Numero de documento</label>
                        <input 
                            type="number"
                            id="document_number" 
                            name= "document_number" 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.document_number} 
                        />
                    </div>
                    {formik.touched.document_number && formik.errors.document_number ? <div className="error">{formik.errors.document_number}</div> : null}
                    <div>
                        <label htmlFor="role">Rol</label>
                        <input 
                            type="text"
                            id="role" 
                            name= "role" 
                            disabled={true}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.role} 
                        />
                    </div>
                    {formik.touched.document_number && formik.errors.document_number ? <div className="error">{formik.errors.document_number}</div> : null}      
                    <div>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text" 
                            id="email" 
                            name= "email" 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email} 
                        />
                    </div>
                    {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
                    <div>
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            name= "username" 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}    
                        />
                    </div>
                    {formik.touched.username && formik.errors.username ? <div className="error">{formik.errors.username}</div> : null}
                    <div>
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password" 
                            id="password" 
                            name= "password" 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                    </div>
                    {formik.touched.password && formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
                    <div>
                        <label htmlFor="passwordVerification">Confirma la Contraseña</label>
                        <input 
                            type="password" 
                            id="passwordVerification" 
                            name= "passwordVerification" 
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                            value={formik.values.passwordVerification}
                        />
                    </div>
                    {formik.touched.passwordVerification && formik.errors.passwordVerification ? <div className="error">{formik.errors.passwordVerification}</div> : null}
                    <div>
                        <label htmlFor="phone">Telefono</label>
                        <input 
                            type="number" 
                            id="phone" 
                            name= "phone" 
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}   
                        />
                    </div>
                    {formik.touched.phone && formik.errors.phone ? <div className="error">{formik.errors.phone}</div> : null}
                    
                    <div > 
                        <button className="btn btn-success"type="submit" onClick={sendVerification && handleShowLoginVerification}>Enviar</button>
                    </div>
                    {error && <p className="error">{message}</p>}
                </form>

            </Container>


        </div>
        

        {/* LOGIN CONFIRMATION */}
        <Snackbar open={showLoginVerification} autoHideDuration={6000} onClose={handleCloseLoginVerification }>
            <Alert onClose={handleCloseLoginVerification } severity="success" sx={{ width: '100%' }}>
                This is a success message!
            </Alert>
        </Snackbar>

        </>
    );

};
export default Register;