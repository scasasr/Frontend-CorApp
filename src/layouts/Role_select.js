import React from "react";
import { Link} from "react-router-dom";
import { Paper } from "@mui/material";
import Navbar_all from '../components/Navbar.js'

//cookie component import
import Cookies from "universal-cookie";


//images
import logo from '../assets/logo.png';

// mui material icons
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import LockPersonIcon from '@mui/icons-material/LockPerson';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SellIcon from '@mui/icons-material/Sell';


const RoleSelect = () =>{
    const fontStyles = {fontSize: '70px'};

    var cookie = new Cookies();

    return(
        <>
        {/*NAVBAR START*/}
        {/* <div class="container-fluid sidebar">
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
                                < div class="btn btn-primary mr-3 d-none d-lg-block " onClick={cookie.remove('role')}>
                                    <ArrowBackIcon fontSize="100px"/>
                                    Volver
                                </div>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/login">
                                < div class="btn btn-secondary mr-3 d-none d-lg-block ">
                                    <LockPersonIcon fontSize="100px"/>
                                    Entrar 
                                </div>
                            </Nav.Link>
                        </div>
                    </nav>
                </div>
            </div>
        </div> */}
        {/*NAVBAR START*/}
        {Navbar_all("arrow_back","lock_person","/","/login","Volver","Entrar")}
        {/*NAVBAR END*/}

        {/*NAVBAR END*/}

        <div class="style-background register_cont">
            <h1 class="pt-4">Por favor seleccione un tipo de cuenta para continuar</h1>
            <p class="mt-3 pt-4">Debe seleccionar un rol para poder registrarse</p>
            <div class="register-mt pt-2 ">
                <Paper elevation={3}>
                    <div class="paper-p-6 mt-3">
                        <ShoppingBasketIcon style={fontStyles} />
                        <h3 >Comprador</h3>
                        < Link to="/RegisterC" class="btn btn-secondary mr-3 d-none d-lg-block" onClick={cookie.set('role',"comprador",{path:"/"})}>
                            Seleccionar    
                        </Link>
                    </div>
                </Paper>
                <Paper elevation={3}>
                    <div class="paper-p-6 mt-3">
                        <SellIcon style={fontStyles} />
                        <h3 >Vendedor</h3>
                        < Link to="/RegisterV" class="btn btn-secondary mr-3 d-none d-lg-block" onClick={cookie.set('role',"vendedor",{path:"/"})}>
                            Seleccionar    
                        </Link>
                    </div>
                </Paper>
                <Paper elevation={3}>
                    <div class="paper-p-6 mt-3">
                        <Diversity1Icon style={fontStyles} />
                        <h3 >Beneficiario</h3>
                        < Link to="/RegisterB" class="btn btn-secondary mr-3 d-none d-lg-block" onClick={cookie.set('role',"beneficiario",{path:"/"})}>
                            Seleccionar    
                        </Link>
                    </div>
                </Paper>
            </div> 
        </div>

        

        </>
    );

};


export default RoleSelect;