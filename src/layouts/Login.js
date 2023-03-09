import React from "react";
import { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import { Nav,Modal } from 'react-bootstrap';
import PasswordRecovery from '../components/Password_recovery.js';
import { Container,Snackbar,Alert } from "@mui/material";
import Navbar_all from "../components/Navbar.js";

//Conecction to API-rest
import API from '../services/http-common.js'

//form validation
import { useFormik} from "formik";
import * as Yup from 'yup';

//cookie component import
import Cookies from "universal-cookie";

const Login = () =>{

    // const [loggeado, SetLoggeado] = useState(cookie.get("logged"));

    //errors use
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    //Show password recovery form modal
    const [showModalPasswordRecovery, setShowModalPasswordRecovery] = useState(false);

    const handleCloseModalPasswordRecovery = () => setShowModalPasswordRecovery(false);
    const handleShowModalPasswordRecovery = () => setShowModalPasswordRecovery(true);

    //Show login verification
    const [showLoginVerification, setShowLoginVerification] = useState(false);

    const handleCloseLoginVerification = () => setShowLoginVerification(false);
   

    //cookie
    var cookie = new Cookies();

    

    //form login
    const formik = useFormik({
        initialValues: {
            email:'',
            password:""
        },

        validationSchema:Yup.object({
            email:Yup.string().email("Formato de email incorrecto").required("Este campo es requerido"),
            password:Yup.string().required("Este campo es requerido").min(8,"La contraseña es muy corta").max(25)

        }),
        onSubmit: values => {
            console.log(values)
            const partner_data =JSON.stringify(values)
            API.post('partners/login',partner_data).then((response)=>{
                if(response.status === 201){
                    formik.resetForm();
                    console.log(response.data)
                    const role  = response.data["role_name"];
                    console.log(role)
                    
                    cookie.set('user_id',response.data["partner"]["_id"],{path:"/"});
                    cookie.set('name',response.data["partner"]["name"], {path:"/"});
                    cookie.set('lastname',response.data["partner"]["last_name"], {path:"/"});
                    cookie.set('email',response.data["partner"]["email"],{path:"/"});
                    cookie.set('role',role,{path:"/"});
                    cookie.set("logged", true, { path: '/' });

                    if(role === "comprador")window.location.href = "./Buyer";
                    if(role === "beneficiario")window.location.href = "./Beneficiary";
                    if(role === "vendedor")window.location.href = "./Seller";
                    if(role === "admin")window.location.href = "./Admin";
                    showLoginVerification = setShowLoginVerification(true)
                    
                }
                
            }).catch(error =>{
                var error_data = error.response.data["error"] ;
                if(error_data === "Error de servidor" || error_data === "Correo incorrecto"|| error_data === "Contraseña incorrecta"){
                    setMessage(error_data);
                    setError(true)
                    setTimeout(() => setError(false),3000);
                }else{
                    setMessage(error_data);
                    setError(true);  
                    navigate(("/")); 
                    setTimeout(() => setError(false),3000);
                }
            });
            
          
        },
      });

    return(
        <>
        {/*NAVBAR START*/}
        {Navbar_all("arrow_back","how_to_reg","/","/RoleSelect","Volver","Registrarse")}
        {/*NAVBAR END*/}

        {/*FORM LOGIN START*/}
        <div class="style-background register_cont" >
            <h1 class="mt-2">Iniciar sesión</h1>
            <Container class ="login-mt" >
                
                <form className="form_style" onSubmit={formik.handleSubmit}>
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
                    <button className="btn btn-primary"type="submit">Entrar</button>
                    </div>

                    {error && <p className="error">{message}</p>}

                    <Nav.Link as={Link} to="/RoleSelect">
                        <small>¿No estas registrado?</small>
                    </Nav.Link>
                    <Nav.Link onClick={handleShowModalPasswordRecovery}>
                        <small >¿Olvidaste tu contraseña?</small>
                    </Nav.Link>
                </form>

            </Container>

        </div>
        {/*FORM LOGIN END*/}


        {/*MODAL PASSWORD RECOVERY*/}
        <Modal show={showModalPasswordRecovery} onHide={handleCloseModalPasswordRecovery}>
            <Modal.Header closeButton>
                <Modal.Title>Recuperar contraseña</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PasswordRecovery />
            </Modal.Body>
        </Modal>


        {/* LOGIN CONFIRMATION */}
        <Snackbar open={showLoginVerification} autoHideDuration={6000} onClose={handleCloseLoginVerification }>
            <Alert onClose={handleCloseLoginVerification } severity="success" sx={{ width: '100%' }}>
                This is a success message!
            </Alert>
        </Snackbar>

        </>
       
    );
};

export default Login;