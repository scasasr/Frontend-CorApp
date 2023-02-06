import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from './layouts/Main.js';
import Login from './layouts/Login.js';
import RoleSelect from './layouts/Role_select.js';
import Register from './layouts/Register.js';
import Buyer from './layouts/Buyer.js';
import Admin from './layouts/Admin.js';
import Clients from './layouts/adminPages/Clients.js';
import Countries from './layouts/adminPages/Countries.js';
import Cities from './layouts/adminPages/Cities.js';
import Squares from './layouts/adminPages/Squares.js';
import Warehouses from './layouts/adminPages/Warehouses.js';
import Places from './layouts/adminPages/Places.js';
import Products from './layouts/adminPages/Products.js';
import Bill from './layouts/Bill.js'
import Categories from './layouts/adminPages/Categories.js';
import { ProtectedRoute } from './components/adminView/ProtectedRoute';




function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='RoleSelect' element={<RoleSelect/>}/>
            <Route path='RegisterCB' element={<Register/>}/>
            <Route path='Buyer' element={<Buyer/>}/>
            <Route path="Admin/" element={
              <ProtectedRoute>
                <Admin/>
              </ProtectedRoute>
            }>
              <Route path='Vendedores' element={<Clients/>}/>
              <Route path='Compradores' element={<Clients/>}/>
              <Route path='Beneficiarios' element={<Clients/>}/>
              <Route path='Paises' element={<Countries/>}/>
              <Route path='Ciudades' element={<Cities/>}/>
              <Route path='Plazas' element={<Squares/>}/>
              <Route path='Bodegas' element={<Warehouses/>}/>
              <Route path='Puestos' element={<Places/>}/>
              <Route path='Productos' element={<Products/>}/>
              <Route path='Categorias' element={<Categories/>}/>

            </Route>
            <Route path='Bill'element={<Bill/>}/>
            
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
