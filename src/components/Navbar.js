import React from "react";
import { Link} from "react-router-dom";
import { Nav } from 'react-bootstrap';

import Icon from '@mui/material/Icon';

//cookie component import
import Cookies from "universal-cookie";


//images
import logo from '../assets/logo.png';

const Navbar_all = (iconBtn_1,iconBtn_2,pathBtn_1,pathBtn_2,textBtn_1,textBtn_2) =>{
    
    var cookie = new Cookies();

    let logged = cookie.get('logged');


   
    return(
        <>
        {/*NAVBAR START*/}
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-3 bg-secondary d-none d-lg-block"> 
                    <a href="/" class="navbar-brand w-100 h-100 m-0 p-0 d-flex align-items-center justify-content-center">
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
                            {
                                logged ? 
                                (
                                    <>
                                        <div className="userTest">
                                            <Icon> account_circle</Icon>
                                            <div className="userdata">
                                                <p>{cookie.get('name')+" "+cookie.get('lastname')}</p>
                                                <p>{cookie.get('email')}</p>
                                                <p>{cookie.get('role')}</p>
                                            </div>


                                        </div>
                                    </>
                                ):(
                                    <>
                                        <Nav.Link as={Link} to={pathBtn_1}>
                                            < div class="btn btn-primary mr-3 d-none d-lg-block ">
                                                <Icon className="pt-1 mr-1">{iconBtn_1}</Icon>{textBtn_1}   
                                            </div>
                                        </Nav.Link>
                                        <Nav.Link as={Link} to={pathBtn_2}>
                                            < div class="btn btn-secondary mr-3 d-none d-lg-block ">
                                                <Icon className="pt-1 mr-1">{iconBtn_2}</Icon>{textBtn_2}
                                            </div>
                                        </Nav.Link>
                                    </>
                                )
                            }
                        </div>
                    </nav>
                </div>
            </div>
        </div>
        {/*NAVBAR END*/}

        
        </>
    );

};

export default Navbar_all;