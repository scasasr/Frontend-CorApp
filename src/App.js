import './App.css';

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Main from './layouts/Main.js';
import Login from './layouts/Login.js';
import RoleSelect from './layouts/Role_select.js';
import Register from './layouts/Register.js';
import Buyer from './layouts/dashboards/Buyer.js';
import Beneficiary from './layouts/dashboards/Beneficiary.js';
import Seller from './layouts/dashboards/Seller.js';
import Admin from './layouts/dashboards/Admin.js';


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
            <Route path='Beneficiary' element={<Beneficiary/>}/>
            <Route path='Seller' element={<Seller/>}/>
            <Route path='Admin' element={<Admin/>}/>
            

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
