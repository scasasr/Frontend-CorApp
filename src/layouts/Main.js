import React from "react";
import '../style.css';

import { Link} from "react-router-dom";
import { Nav,Modal } from 'react-bootstrap';

//images
import logo from '../assets/logo.png';
import carrusel_img1 from '../assets/N1.jpg';
import feature1 from '../assets/S1.jpg';


// mui material icons
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LockPersonIcon from '@mui/icons-material/LockPerson';


const Main = () =>{
    return(
        <>
        {/*NAVBAR START*/}
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-3 bg-secondary d-none d-lg-block"> 
                    <a href="" class="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center">
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
                                <Link to="/Buyer" class="nav-item nav-link">Comprar</Link>
                                <a href="service.html" class="nav-item nav-link">Impacto</a>
                                <a href="project.html" class="nav-item nav-link">Contacto</a>
                                <a href="contact.html" class="nav-item nav-link">Nosotros</a>
                            </div>
                            <Nav.Link as={Link} to="/login">
                                < div class="btn btn-primary mr-3 d-none d-lg-block ">
                                    <LockPersonIcon/>
                                    Entrar 
                                </div>
                            </Nav.Link>
                            <Nav.Link as={Link} to="/RoleSelect">
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

        {/*CARRUSEL START*/}
        <div class="container-fluid p-0">
            <div id="header-carousel" class="carousel slide carousel-fade" data-ride="carousel">
                {/* <ol class="carousel-indicators">
                    <li data-target="#header-carousel" data-slide-to="0" class="active"></li>
                    <li data-target="#header-carousel" data-slide-to="1"></li>
                </ol> */}
                
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="img-fluid" src={carrusel_img1} alt="Image"/>
                        <div class="carousel-caption d-flex align-items-center justify-content-start">
                            <div class="p-5" style={{width: "100%", maxWidth:"900px"}}>
                                <h3 class="text-primary text-uppercase mb-md-3">CORAPPBASTOS</h3>
                                <h2 class="text-white mb-md-4">La app diseñada para facilitar</h2>
                                <h2 class="text-white mb-md-4">el comercio y las donaciones </h2>
                                <h2 class="text-white mb-md-4">de alimentos perecederos.</h2>
                                <Nav.Link as={Link} to="/login">
                                    <div href="" class="btn btn-primary">Iniciar ahora</div>
                                </Nav.Link>
                            </div>
                        </div>
                    </div>
                    {/* <div class="carousel-item">
                        <img class="img-fluid" src={carrusel_img2} alt="Image"/>
                        <div class="carousel-caption d-flex align-items-center justify-content-center">
                            <div class="p-5" style={{width: "100%", maxWidth:"900px"}}>
                                <h5 class="text-primary text-uppercase mb-md-3">Cleaning Services</h5>
                                <h1 class="display-3 text-white mb-md-4">Highly Professional Cleaning Services</h1>
                                
                                <a href="" class="btn btn-primary">Get A Quote</a>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
        {/*CARRUSEL END*/}

        <div class="container-fluid py-5 style-background" >
            <div class="container py-5">
                <div class="row">
                    <div class="col-lg-7 pt-lg-5 pb-3">
                        <h6 class="text-secondary font-weight-semi-bold text-uppercase mb-3">Por qué elegirnos</h6>
                        <h1 class="mb-4 section-title">25 Years Experience In Cleaning Industry</h1>
                        <p class="mb-4">Dolores lorem lorem ipsum sit et ipsum. Sadip sea amet diam dolore sed et. Sit rebum labore sit sit ut vero no sit. Et elitr stet dolor sed sit et sed ipsum et kasd ut. Erat duo eos et erat sed diam duo</p>
                        <div class="row">
                            <div class="col-sm-4">
                                <h1 class="text-secondary mb-2" data-toggle="counter-up">225</h1>
                                <h6 class="font-weight-semi-bold mb-sm-4">Our Cleaners</h6>
                            </div>
                            <div class="col-sm-4">
                                <h1 class="text-secondary mb-2" data-toggle="counter-up">1050</h1>
                                <h6 class="font-weight-semi-bold mb-sm-4">Happy Clients</h6>
                            </div>
                            <div class="col-sm-4">
                                <h1 class="text-secondary mb-2" data-toggle="counter-up">2500</h1>
                                <h6 class="font-weight-semi-bold mb-sm-4">Projects Done</h6>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5" style={{minHeight:"500px"}}>
                        <div class="position-relative h-100 rounded overflow-hidden ml-3">
                            <img class="position-relative w-100 h-100 " src={feature1} style={{objectFit:"cover"}}/> 
                        </div>
                    </div>
                </div>
            </div>
        </div>


        
        <div class="container-fluid py-5 mb-5 ">
            <div class="containercd-flex justify-content-around">
                <div class="row ">
                    <div class="col-lg-5 ml-0">
                        <div class=" ml-0 d-flex flex-column align-items-center justify-content-center bg-about rounded h-100 py-5 px-3">
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/MnQHZ50zbRA?&autoplay=1" 
                            title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; 
                            encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                        </div>
                    </div>
                    <div class="col-lg-7 pt-5 pb-lg-5 d-flex align-items-center">
                        <div>
                            <h5 class="text-secondary font-weight-semi-bold text-uppercase mb-3 d-flex justify-content-start">CORAPPBASTOS</h5>
                            <h1 class="mb-4 section-title d-flex justify-content-start">GANADORES TITANES CARACOL</h1>
                            <h5 class="text-muted font-weight-normal mb-3 text-left">Gracias al apoyo de la gente, somos ganadores de Titanes caracol 2022 - Categoria de Tecnologia e Innovación</h5>
                            <Nav.Link as={Link} to="/login">
                                <div class="d-flex align-items-center pt-4">
                                    <div href="" class="btn btn-primary mr-5">Comenzar</div>
                                </div>
                            </Nav.Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* FOOTER START */}
        <div class="container-fluid bg-dark text-white mt-5 py-5 px-sm-3 px-md-5">
        <div class="row pt-5">
            <div class="col-lg-3 col-md-6 mb-5">
                <a href="index.html" class="navbar-brand">
                    <h1 class="m-0 mt-n3 display-4 text-primary">CorApp</h1>
                </a>
                <p>Volup amet magna clita tempor. Tempor sea eos vero ipsum. Lorem lorem sit sed elitr sed kasd et</p>
                <h5 class="font-weight-semi-bold text-white mb-2">Opening Hours:</h5>
                <p class="mb-1">Mon – Sat, 8AM – 5PM</p>
                <p class="mb-0">Sunday: Closed</p>
            </div>
            <div class="col-lg-3 col-md-6 mb-5">
                <h4 class="font-weight-semi-bold text-primary mb-4">Get In Touch</h4>
                <p><i class="fa fa-map-marker-alt text-primary mr-2"></i>123 Street, New York, USA</p>
                <p><i class="fa fa-phone-alt text-primary mr-2"></i>+012 345 67890</p>
                <p><i class="fa fa-envelope text-primary mr-2"></i>info@example.com</p>
                <div class="d-flex justify-content-start mt-4">
                    <a class="btn btn-light btn-social mr-2" href="#"><i class="fab fa-twitter"></i></a>
                    <a class="btn btn-light btn-social mr-2" href="#"><i class="fab fa-facebook-f"></i></a>
                    <a class="btn btn-light btn-social mr-2" href="#"><i class="fab fa-linkedin-in"></i></a>
                    <a class="btn btn-light btn-social" href="#"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-5">
                <h4 class="font-weight-semi-bold text-primary mb-4">Quick Links</h4>
                <div class="d-flex flex-column justify-content-start">
                    <a class="text-white mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>Home</a>
                    <a class="text-white mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>About Us</a>
                    <a class="text-white mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>Our Services</a>
                    <a class="text-white mb-2" href="#"><i class="fa fa-angle-right mr-2"></i>Our Projects</a>
                    <a class="text-white" href="#"><i class="fa fa-angle-right mr-2"></i>Contact Us</a>
                </div>
            </div>
            <div class="col-lg-3 col-md-6 mb-5">
                <h4 class="font-weight-semi-bold text-primary mb-4">Newsletter</h4>
                <p>Rebum labore lorem dolores kasd est, et ipsum amet et at kasd, ipsum sea tempor magna tempor. Accu kasd sed ea duo ipsum.</p>
                <div class="w-100">
                    <div class="input-group">
                        <input type="text" class="form-control border-0" style={{padding:"25px"}} placeholder="Your Email"/>
                        <div class="input-group-append">
                            <button class="btn btn-primary px-4">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid bg-dark text-white border-top py-4 px-sm-3 px-md-5" style={{borderColor:"#3E3E4E !important"}}>
        <div class="row">
            <div class="col-lg-6 text-center text-md-left mb-3 mb-md-0">
                <p class="m-0 text-white">&copy; <a href="#">CorApp</a>. Desarrollado por <a href="/">TayronaSolutions</a>
                </p>
            </div>
            <div class="col-lg-6 text-center text-md-right">
                <ul class="nav d-inline-flex">
                    <li class="nav-item">
                        <a class="nav-link text-white py-0" href="#">Privacy</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white py-0" href="#">Terms</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white py-0" href="#">FAQs</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white py-0" href="#">Help</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    {/*FOOTER END*/}


    {/* BACK TO */}
    <a href="#" class="btn btn-primary px-3 back-to-top"><i class="fa fa-angle-double-up"></i></a>

        </>
    )


};

export default Main;