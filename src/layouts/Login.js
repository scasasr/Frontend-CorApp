import React from "react";
import { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
import { Nav,Modal } from 'react-bootstrap';
import PasswordRecovery from '../components/Password_recovery.js';
import { Container,Snackbar,Alert } from "@mui/material";

//Conecction to API-rest
import API from '../services/http-common.js'

//images
import logo from '../assets/logo.png';

// mui material icons
import HowToRegIcon from '@mui/icons-material/HowToReg';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
    // const [showLoginVerification, setShowLoginVerification] = useState(false);

    // const handleCloseLoginVerification = () => setShowLoginVerification(false);
    // const handleShowLoginVerification = () => setShowLoginVerification(true);

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
                    cookie.set('user_id',response.data["partner"]["_id"],{path:"/"});
                    cookie.set('name',response.data["partner"]["name"], {path:"/"});
                    cookie.set('lastname',response.data["partner"]["lastname"], {path:"/"});
                    cookie.set('email',response.data["partner"]["email"],{path:"/"});
                    cookie.set('role',response.data["role_name"],{path:"/"});
                    cookie.set("logged", true, { path: '/' });

                    const role  = cookie.get('role');
                    if(role === "comprador")window.location.href = "./Buyer";
                    if(role === "beneficiario")window.location.href = "./Beneficiary";
                    if(role === "vendedor")window.location.href = "./Seller";
                    if(role === "administrador")window.location.href = "./Admin";
                    
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
        <div class="container-fluid sidebar">
            <div class="row">
                <div class="col-lg-3 bg-secondary d-none d-lg-block"> 
                    <a href='/' class="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center">
                        <img  width="90" height="90" src={logo} alt="React Bootstrap logo"/> 
                        <h1 class="m-2 display-3 text-primary d-inline-block align-top">CorApp</h1>
                    </a>
                </div>
                <div class="col-lg-9">
                    <div class="row bg-dark d-none d-lg-flex">
                        <div class="col-lg-7 text-left text-white">
                            <div class="h-100 d-inline-flex align-items-center border-right border-primary py-2 px-3">
                                <i class="fa fa-envelope text-primary mr-2"></i>
                                <small>contactenos@corappbastos.com</small>
                            </div>
                            <div class="h-100 d-inline-flex align-items-center py-2 px-2">
                                <i class="fa fa-phone-alt text-primary mr-2"></i>
                                <small>+57 316 380 6190</small>
                            </div>
                        </div>
                        <div class="col-lg-5 text-right">
                            <div class="d-inline-flex align-items-center pr-2">
                                <a class="text-primary p-2" href="">
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                                <a class="text-primary p-2" href="">
                                    <i class="fab fa-twitter"></i>
                                </a>
                                <a class="text-primary p-2" href="">
                                    <i class="fab fa-linkedin-in"></i>
                                </a>
                                <a class="text-primary p-2" href="">
                                    <i class="fab fa-instagram"></i>
                                </a>
                                <a class="text-primary p-2" href="">
                                    <i class="fab fa-youtube"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <nav class="navbar navbar-expand-lg bg-white navbar-light p-0">
                        <a href="" class="navbar-brand d-block d-lg-none">
                            <h1 class="m-0 display-4 text-primary">CorApp</h1>
                        </a>
                        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div class="navbar-nav mr-auto py-0">
                                <Link to="/" class="nav-item nav-link active">inicio</Link>
                                <a href="about.html" class="nav-item nav-link">Actores</a>
                                <a href="service.html" class="nav-item nav-link">Impacto</a>
                                <a href="project.html" class="nav-item nav-link">Contacto</a>
                                <a href="contact.html" class="nav-item nav-link">Nosotros</a>
                            </div>
                            <Nav.Link as={Link} to="/">
                                < div class="btn btn-primary mr-3 d-none d-lg-block ">
                                    <ArrowBackIcon/>
                                    Volver
                                </div>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/RegisterCB">
                                < div class="btn btn-secondary mr-3 d-none d-lg-block ">
                                    <HowToRegIcon/>
                                    Registrarse 
                                </div>
                            </Nav.Link>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
        {/*NAVBAR END*/}

        {/*FORM LOGIN START*/}
        <div class="style-background register_cont" >
            <h1 class="mt-2">Iniciar sesión</h1>
            <Container class ="register-mt" >
                
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
                    <button className="btn btn-primary"type="submit">Enviar</button>
                    </div>
                    {error && <p className="error">{message}</p>}
                    <Nav.Link as={Link} to="/RegisterCB">
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
        {/* <Snackbar open={showLoginVerification} autoHideDuration={6000} onClose={handleCloseLoginVerification }>
            <Alert onClose={handleCloseLoginVerification } severity="success" sx={{ width: '100%' }}>
                This is a success message!
            </Alert>
        </Snackbar> */}

        </>
       
    );
};

export default Login;