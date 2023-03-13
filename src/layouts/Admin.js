import React from "react";
import {  Route, Routes } from "react-router-dom";
import '../components/adminView/style.scss'


import SidebarAdmin from "../components/adminView/SidebarAdmin.js";
import Clients from "./adminPages/Clients.js";
import Countries from "./adminPages/Countries.js";
import Cities from "./adminPages/Cities.js";
import Squares from "./adminPages/Squares.js";
import Warehouses from "./adminPages/Warehouses.js";
import Places from "./adminPages/Places.js";
import Products from "./adminPages/Products.js";
import Categories from "./adminPages/Categories.js";
import Udm from "./adminPages/Udm.js";
import Qualities from "./adminPages/Qualities.js";

import Navbar_all from "../components/Navbar.js";

const Admin = () => {
    return(
        <>
        {Navbar_all("arrow_back","lock_person","/","/login","Volver","Entrar")}
        <div className="flex">
            <SidebarAdmin/>
            <div className="content w-100">
                <Routes>
                <Route path="/Vendedores" exact={true} element={<Clients role="vendedor"/>}/>
                <Route path="/Compradores" exact={true} element={<Clients role="comprador"/>}/>
                <Route path="/Beneficiarios" exact={true} element={<Clients role="beneficiario"/>}/>
                <Route path='Paises' exact={true} element={<Countries/>}/>
                <Route path='Ciudades' exact={true} element={<Cities/>}/>
                <Route path='Plazas' exact={true} element={<Squares/>}/>
                <Route path='Bodegas' exact={true} element={<Warehouses/>}/>
                <Route path='Puestos' exact={true} element={<Places/>}/>
                <Route path='Productos' exact={true} element={<Products/>}/>
                <Route path='Categorias' exact={true} element={<Categories/>}/>
                <Route path='Udm' exact={true} element={<Udm/>}/>
                <Route path='Calidades' exact={true} element={<Qualities/>}/>
                </Routes>
    
            </div>
        </div>
        

        
        </>
    );

};
export default Admin;