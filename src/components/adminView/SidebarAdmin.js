import { NavLink } from "react-router-dom";
import React from "react";
import './style.scss'

import StorefrontIcon from '@mui/icons-material/Storefront';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';
import SellIcon from '@mui/icons-material/Sell';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import StoreIcon from '@mui/icons-material/Store';
import CategoryIcon from '@mui/icons-material/Category';
import FlagIcon from '@mui/icons-material/Flag';
import SignpostIcon from '@mui/icons-material/Signpost';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import StyleIcon from '@mui/icons-material/Style';

const SidebarAdmin = () => {
    return(
        <div className="sidebar">
            <ul>
                {/* <li>
                    <NavLink to="" exact className= "text-dark rounded py-2 w-100 d-inline-block px-3 d-flex justify-content-start" 
                    activeclassname="active">Inicio</NavLink>
                </li> */}

                <li>
                    
                    <NavLink to="Vendedores" exact className= "text-dark rounded py-2 w-100 d-inline-block px-3 d-flex justify-content-start" 
                    activeclassname="active"><SellIcon className="mr-2" /> Vendedores</NavLink>
                </li>

                <li>
                    
                    <NavLink to="Compradores" exact className= "text-dark rounded py-2 w-100 d-inline-block px-3 d-flex justify-content-start" 
                    activeclassname="active"><ShoppingBasketIcon className="mr-2"/> Compradores</NavLink>
                </li>

                <li>
                    
                    <NavLink to="Beneficiarios" exact className= "text-dark rounded py-2 w-100 d-inline-block px-3 d-flex justify-content-start" 
                    activeclassname="active"><Diversity1Icon className="mr-2"/> Beneficiarios</NavLink>
                </li>

                <li>
                    
                    <NavLink to="Categorias" exact className= "text-dark rounded py-2 w-100 d-inline-block px-3 d-flex justify-content-start" 
                    activeclassname="active"><StyleIcon className="mr-2"/> Categorias</NavLink>
                </li>

                <li>
                    
                    <NavLink to="Productos" exact className= "text-dark rounded py-2 w-100 d-inline-block px-3 d-flex justify-content-start" 
                    activeclassname="active"><CategoryIcon className="mr-2"/> Productos</NavLink>
                </li>

                <li>
                    
                    <NavLink to="Paises" exact className= "text-dark rounded py-2 w-100 d-inline-block px-3 d-flex justify-content-start" 
                    activeclassname="active"><FlagIcon className="mr-2"/> Paises</NavLink>
                </li>

                <li>
                    
                    <NavLink to="Ciudades" exact className= "text-dark rounded py-2 w-100 d-inline-block px-3 d-flex justify-content-start" 
                    activeclassname="active"><SignpostIcon className="mr-2"/> Ciudades</NavLink>
                </li>

                <li>
                    
                    <NavLink to="Plazas" exact className= "text-dark rounded py-2 w-100 d-inline-block px-3 d-flex justify-content-start" 
                    activeclassname="active"><StoreIcon className="mr-2"/> Plazas</NavLink>
                </li>

                <li>
                    
                    <NavLink to="Bodegas" exact className= "text-dark rounded py-2 w-100 d-inline-block px-3 d-flex justify-content-start" 
                    activeclassname="active"><LocalConvenienceStoreIcon className="mr-2"/> Bodegas</NavLink>
                </li>

                <li>
                    
                    <NavLink to="Puestos" exact className= "text-dark rounded py-2 w-100 d-inline-block px-3 d-flex justify-content-start" 
                    activeclassname="active"><StorefrontIcon className="mr-2"/> Puestos</NavLink>
                </li>

                <li>
                    
                    <NavLink to="Udm" exact className= "text-dark rounded py-2 w-100 d-inline-block px-3 d-flex justify-content-start" 
                    activeclassname="active"><ThermostatAutoIcon className="mr-2"/>U.Medidas</NavLink>
                </li>

                <li>
                    
                    <NavLink to="Calidades" exact className= "text-dark rounded py-2 w-100 d-inline-block px-3 d-flex justify-content-start" 
                    activeclassname="active"><VolunteerActivismIcon className="mr-2"/>Calidades</NavLink>
                </li>


            </ul>


        </div>

    );

};

export default SidebarAdmin;