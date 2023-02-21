import React, {useState} from "react";
import '../style.css';
import CountUp from "react-countup";
import ScrollTrigger from 'react-scroll-trigger';


import { Link} from "react-router-dom";
import { Nav,Modal } from 'react-bootstrap';
import Navbar_all from "../components/Navbar.js";

//images
import logo from '../assets/logo.png';
import carrusel_img1 from '../assets/N1.jpg';
import feature1 from '../assets/S1.jpg';


// mui material icons
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LockPersonIcon from '@mui/icons-material/LockPerson';


import Cookies from "universal-cookie";


const Main = () =>{


    // var cookie = new Cookies();

    // cookie.set("logged",false,{ path: '/' });


    const [countUp, setCountUp] = useState(false);

    return(
        <>

        {/*NAVBAR START*/}
        {Navbar_all("lock_person","how_to_reg","/login","RoleSelect","Entrar","Registrarse")}
        {/*NAVBAR END*/}

        {/*CARRUSEL START*/}
        <div className="container-fluid_ p-0">
            <div id="header-carousel" className="carousel slide carousel-fade" data-ride="carousel">
                {/* <ol className="carousel-indicators">
                    <li data-target="#header-carousel" data-slide-to="0" className="active"></li>
                    <li data-target="#header-carousel" data-slide-to="1"></li>
                </ol> */}
                
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="img-fluid" src={carrusel_img1} alt="Image"/>
                        <div className="carousel-caption d-flex align-items-center justify-content-start">
                            <div className="p-5" style={{width: "100%", maxWidth:"900px"}}>
                                <h4 className="text-primary text-uppercase mb-md-3">CORAPPBASTOS</h4>
                                <h3 className="text-white mb-md-4">La app diseñada para facilitar</h3>
                                <h3 className="text-white mb-md-4">el comercio y las donaciones </h3>
                                <h3 className="text-white mb-md-4">de alimentos perecederos.</h3>
                                <Nav.Link as={Link} to="/login">
                                    <div href="" className="btn btn-primary">Iniciar ahora</div>
                                </Nav.Link>
                            </div>
                        </div>
                    </div>
                    {/* <div className="carousel-item">
                        <img className="img-fluid" src={carrusel_img2} alt="Image"/>
                        <div className="carousel-caption d-flex align-items-center justify-content-center">
                            <div className="p-5" style={{width: "100%", maxWidth:"900px"}}>
                                <h5 className="text-primary text-uppercase mb-md-3">Cleaning Services</h5>
                                <h1 className="display-3 text-white mb-md-4">Highly Professional Cleaning Services</h1>
                                
                                <a href="" className="btn btn-primary">Get A Quote</a>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
        {/*CARRUSEL END*/}

        <div>
            <div className="container-fluid_ py-5 style-background d-flex justify-content-around" >
               
                    
                        <div className="col-lg-7 pt-lg-5 pb-3 pr-2 d-flex align-items-center">
                            <div>
                                <h6 className="text-secondary font-weight-semi-bold text-uppercase mb-3">¿Por qué elegirnos?</h6>
                                <h1 className="mb-4 section-title"></h1>
                                <p className="mb-4">Somos la primera plataforma a nivel mundial que permite la comercialización y donacion de alimentos en las centrales de abasto.</p>
                                <ScrollTrigger onEnter={() => setCountUp(true)} onExit={() => setCountUp(false)}>
                                    <div className="row mr-3">
                                        <div className="col-sm-4">
                                            <h1 className="text-secondary mb-2" >
                                                {countUp && <CountUp start={0} end={1500} duration={2} delay={0}/>}
                                                </h1>
                                            <h6 className="font-weight-semi-bold mb-sm-4">Beneficiarios</h6>
                                        </div>
                                        <div className="col-sm-4">
                                            <h1 className="text-secondary mb-2" >
                                                {countUp && <CountUp start={0} end={400} duration={2} delay={0}/>}
                                            </h1>
                                            <h6 className="font-weight-semi-bold mb-sm-4">Vendedores</h6>
                                        </div>
                                        <div className="col-sm-4">
                                            <h1 className="text-secondary mb-2">
                                                {countUp && <CountUp start={0} end={1600} duration={2} delay={0}/>}
                                            </h1>
                                            <h6 className="font-weight-semi-bold mb-sm-4">Compradores</h6>
                                        </div>
                                    </div>
                                </ScrollTrigger>
                            </div>    
                        </div>
                        
                        <div className="col-lg-5 pl-3" style={{minHeight:"500px"}}>
                            <div className="position-relative h-100 rounded overflow-hidden ml-3">
                                <img className="position-relative w-100 h-100 " src={feature1} style={{objectFit:"cover"}}/> 
                            </div>
                        </div>
            </div>


            
            <div className="container-fluid_ py-5 mb-5 ">
                <div className="containercd-flex justify-content-around">
                    <div className="row ">
                        <div className="col-lg-5 ml-0">
                            <div className=" ml-0 d-flex flex-column align-items-center justify-content-center bg-about rounded h-100 py-5 px-3">
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/MnQHZ50zbRA?&autoplay=1" 
                                title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; 
                                encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                            </div>
                        </div>
                        <div className="col-lg-7 pt-5 pb-lg-5 d-flex align-items-center">
                            <div>
                                <h5 className="text-secondary font-weight-semi-bold text-uppercase mb-3 d-flex justify-content-start">CORAPPBASTOS</h5>
                                <h1 className="mb-4 section-title d-flex justify-content-start">GANADORES TITANES CARACOL</h1>
                                <h5 className="text-muted font-weight-normal mb-3 text-left">Gracias al apoyo de la gente, somos ganadores de Titanes caracol 2022 - Categoria de Tecnologia e Innovación</h5>
                                <Nav.Link as={Link} to="/login">
                                    <div className="d-flex align-items-center pt-4">
                                        <div href="" className="btn btn-primary mr-5">Comenzar</div>
                                    </div>
                                </Nav.Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* FOOTER START */}
            <div className="container-fluid_ bg-dark text-white mt-5 py-5 px-sm-3 px-md-5">
                <div className="row pt-5">
                    <div className="col-lg-3 col-md-6 mb-5">
                        <a href="index.html" className="navbar-brand">
                            <h1 className="m-0 mt-n3 display-4 text-primary">CorApp</h1>
                        </a>
                        <p>La app diseñada para facilitar el comercio y las donaciones de alimentos perecederos.</p>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-5">
                        <h4 className="font-weight-semi-bold text-primary mb-4">Get In Touch</h4>
                        <p><i className="fa fa-map-marker-alt text-primary mr-2"></i>123 Street, New York, USA</p>
                        <p><i className="fa fa-phone-alt text-primary mr-2"></i>+57 316 380 6190</p>
                        <p><i className="fa fa-envelope text-primary mr-2"></i>contactenos@corappbastos.com</p>
                        <div className="d-flex justify-content-start mt-4">
                            <a className="btn btn-light btn-social mr-2" href="#"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-light btn-social mr-2" href="#"><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-light btn-social mr-2" href="#"><i className="fab fa-linkedin-in"></i></a>
                            <a className="btn btn-light btn-social" href="#"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-5">
                        <h4 className="font-weight-semi-bold text-primary mb-4">Acceso rapido</h4>
                        <div className="d-flex flex-column justify-content-start">
                            <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Inicio</a>
                            <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Comprar</a>
                            <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Donaciones</a>
                            <a className="text-white mb-2" href="#"><i className="fa fa-angle-right mr-2"></i>Impacto</a>
                            <a className="text-white" href="#"><i className="fa fa-angle-right mr-2"></i>Contactenos</a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 mb-5">
                        <h4 className="font-weight-semi-bold text-primary mb-4">Newsletter</h4>
                        <p>Rebum labore lorem dolores kasd est, et ipsum amet et at kasd, ipsum sea tempor magna tempor. Accu kasd sed ea duo ipsum.</p>
                        <div className="w-100">
                            <div className="input-group">
                                <input type="text" className="form-control border-0" style={{padding:"25px"}} placeholder="Your Email"/>
                                <div className="input-group-append">
                                    <button className="btn btn-primary px-4">Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <div className="container-fluid_ bg-dark text-white border-top py-4 px-sm-3 px-md-5" style={{borderColor:"#3E3E4E !important"}}>
            <div className="row">
                <div className="col-lg-6 text-center text-md-left mb-3 mb-md-0">
                    <p className="m-0 text-white">&copy; <a href="#">CorApp</a>. Desarrollado por <a href="/">TayronaSolutions</a>
                    </p>
                </div>
                <div className="col-lg-6 text-center text-md-right">
                    <ul className="nav d-inline-flex">
                        <li className="nav-item">
                            <a className="nav-link text-white py-0" href="#">Privacy</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white py-0" href="#">Terms</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white py-0" href="#">FAQs</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link text-white py-0" href="#">Help</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        {/*FOOTER END*/}


        {/* BACK TO */}
        <a href="#" className="btn btn-primary px-3 back-to-top"><i className="fa fa-angle-double-up"></i></a>
  
        </div>
        </>
    )


};

export default Main;