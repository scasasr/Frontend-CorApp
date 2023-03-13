import React, { useEffect, useState } from "react";
import Navbar_all from '../components/Navbar.js'


import { Container,Snackbar,Alert } from "@mui/material";

//Conecction to API-rest
import API from '../services/http-common.js'

//form validation
import { useFormik} from "formik";
import * as Yup from 'yup';


import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PasswordIcon from '@mui/icons-material/Password';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PaymentIcon from '@mui/icons-material/Payment';

const Register = (role_name) =>{


    var role_= role_name.role_name
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
  

    const [initialValues,setInitialValues] = useState('');
    const [yupSchema,setYupSchema] = useState(Yup.object({}));

    //Show Register verification
    const [showRegisterVerification, setShowRegisterVerification] = useState(false);

    const handleCloseRegisterVerification = () => setShowRegisterVerification(false);
 
    const formikConfig = () =>{

            if(role_=== "vendedor"){
                setInitialValues({
                    name:"",
                    last_name:"",
                    document_number:"",
                    email:"",
                    username:"",
                    password:"",
                    passwordVerification:"",
                    phone:"",
                    role_name:role_,
                    document_type:'',
                    account_number:''
                })

                setYupSchema(Yup.object({
                    name:Yup.string().required("Este campo es requerido").matches( /^[a-zA-ZÀ-ÿ\s]{1,40}$/,"Solo permite letras y espacios"),
                    last_name:Yup.string().required("Este campo es requerido").matches( /^[a-zA-ZÀ-ÿ\s]{1,40}$/,"Solo permite letras y espacios"),
                    document_number:Yup.string().required("Este campo es requerido").matches(/^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/,"Numero de cedula no valido"),
                    email:Yup.string().email("Formato de email incorrecto").required("Este campo es requerido"),
                    username:Yup.string().required("Este campo es requerido"),
                    account_number:Yup.string().required("Este campo es requerido"),
                    password:Yup.string().required("Este campo es requerido").min(8,"La contraseña es muy corta").max(25),
                    passwordVerification:Yup.string().required("Este campo es requerido").min(8,"La contraseña es muy corta").max(25).oneOf([Yup.ref("password")],"Las contraseñas no coinciden"),
                    phone:Yup.string().required("Este campo es requerido").min(10,"número invalido: menos de 10 digitos").max(10,"número invalido: más de 10 digitos")

            }))
        }else{
            setInitialValues({
                name:"",
                last_name:"",
                document_number:"",
                email:"",
                username:"",
                password:"",
                passwordVerification:"",
                phone:"",
                role_name:role_,
                document_type:'',
            })

            setYupSchema(Yup.object({
                name:Yup.string().required("Este campo es requerido").matches( /^[a-zA-ZÀ-ÿ\s]{1,40}$/,"Solo permite letras y espacios"),
                last_name:Yup.string().required("Este campo es requerido").matches( /^[a-zA-ZÀ-ÿ\s]{1,40}$/,"Solo permite letras y espacios"),
                document_number:Yup.string().required("Este campo es requerido").matches(/^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/,"Numero de cedula no valido"),
                email:Yup.string().email("Formato de email incorrecto").required("Este campo es requerido"),
                username:Yup.string().required("Este campo es requerido"),
                password:Yup.string().required("Este campo es requerido").min(8,"La contraseña es muy corta").max(25),
                passwordVerification:Yup.string().required("Este campo es requerido").min(8,"La contraseña es muy corta").max(25).oneOf([Yup.ref("password")],"Las contraseñas no coinciden"),
                phone:Yup.string().required("Este campo es requerido").min(10,"número invalido: menos de 10 digitos").max(10,"número invalido: más de 10 digitos")

        }))

        }
    }


    useEffect(() => {
        formikConfig();   
    }, []);

    


    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initialValues, 
        validationSchema:yupSchema,
        onSubmit: values => {
            // console.log(values)
            const partner_data =JSON.stringify(values, null, 2)
            API.post('partners/add',partner_data).then((response)=>{
                if(response.status === 201){
                    formik.resetForm();
                    window.location.href ="./login";
                    showRegisterVerification = setShowRegisterVerification(true);

                }
                
            }).catch(error =>{
                var error_data = error.response.data["error"] ;
                if(error_data === "Error de servidor" || error_data === "El id del role no coincide con ninguno registrado"|| error_data === "Ya existe este usuario"){
                    setMessage(error_data);
                    setError(true)
                    setTimeout(() => setError(false),3000);
                }else{
                    setMessage(error_data);
                    setError(true);  
                    // navigate(("/")); 
                    setTimeout(() => setError(false),3000);
                }
            });
            
          
        },
      });

    return(
        <>
        {/*NAVBAR START*/}
            {Navbar_all("arrow_back","lock_person","/RoleSelect","/login","Volver","Entrar")}
        {/*NAVBAR END*/}


        {/* FORM REGISTER START */}
        <div class="style-background register_cont">
            <h1 class="mt-2">Registrarse</h1>
            <h1>{role_}</h1>
            <Container class ="login-mt pt-0" >
                <form className="form_style" onSubmit={formik.handleSubmit}>
                    
                <   div className="input-group mb-3">
                        <span className="input-group-text"><PersonIcon/></span>
                        <input 
                            className="form-control"
                            type="text" 
                            id="name" 
                            name= "name"
                            placeholder="Nombres"
                            onChange={formik.handleChange} 
                            onBlur={formik.handleBlur}
                            value={formik.values.name} 
                        />
                    </div >
                    {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}

                    <div className="input-group mb-3">
                        <span className="input-group-text"><PersonIcon/></span>
                            <input 
                                className="form-control"
                                type="text" 
                                id="last_name" 
                                name= "last_name" 
                                placeholder="Apellidos"
                                onChange={formik.handleChange} 
                                value={formik.values.last_name} 
                            />
                    </div>
                    {formik.touched.last_name && formik.errors.last_name ? <div className="error">{formik.errors.last_name}</div> : null}
                    
                    <div className="input-group mb-3">
                            <span className="input-group-text"><BadgeIcon/></span>
                            <select name="document_type" id="document_type" className="form-control" aria-label="Default select example"
                             defaultValue='placeholder' onChange={formik.handleChange}  onBlur={formik.handleBlur}>
                                <option value='placeholder' disabled>Tipo de documento</option>
                                <option value="C.C">C.C</option>
                                <option value="T.I">T.I</option>
                                <option value="NIT">NIT</option>
                            </select>
                    </div>
                    
                    <div className="input-group mb-3">
                        <span className="input-group-text"><BadgeIcon/></span>
                        <input 
                            className="form-control"
                            type="number"
                            id="document_number" 
                            name= "document_number" 
                            placeholder="Número de documento"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.document_number} 
                        />
                    </div> 
                    {formik.touched.document_number && formik.errors.document_number ? <div className="error">{formik.errors.document_number}</div> : null}
                   
                    <div className="input-group mb-3">
                        <span className="input-group-text"><MailIcon/></span>
                        <input 
                            className="form-control"
                            type="text" 
                            id="email" 
                            name= "email" 
                            placeholder="Correo electrónico"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email} 
                        />
                    </div>
                    {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
                   
                    <div className="input-group mb-3">
                        <span className="input-group-text"><ContactPhoneIcon/></span>
                        <input 
                            className="form-control"
                            type="number" 
                            id="phone" 
                            name= "phone" 
                            placeholder="Teléfono"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}   
                        />
                    </div>
                    {formik.touched.phone && formik.errors.phone ? <div className="error">{formik.errors.phone}</div> : null}
                    
                    <div className="input-group mb-3">
                        <span className="input-group-text"><SentimentSatisfiedAltIcon /></span>
                        <input 
                            className="form-control"
                            type="text" 
                            id="username" 
                            name= "username" 
                            placeholder="Nombre de usuario"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}    
                        />
                    </div>
                    {formik.touched.username && formik.errors.username ? <div className="error">{formik.errors.username}</div> : null}
                    
                    <div className="input-group mb-3">
                            <span className="input-group-text"><SupervisorAccountIcon/></span>
                            <input 
                                className="form-control"
                                type="text" 
                                id="role" 
                                name= "role" 
                                defaultValue={formik.values.role_name} 
                                disabled  
                            />
                        </div>
                        {(role_ === 'vendedor') ? (<>

                            <div className="input-group mb-3">
                                <span className="input-group-text"><PaymentIcon/></span>
                                <input 
                                    className="form-control"
                                    type="number" 
                                    id="account_number" 
                                    name= "account_number" 
                                    placeholder="Número de cuenta bancaria"
                                    onChange={formik.handleChange} 
                                    onBlur={formik.handleBlur}
                                    value={formik.values.account_number}
                                />
                            </div>
                            {formik.touched.account_number && formik.errors.account_number ? <div className="error">{formik.errors.account_number}</div> : null} 
                        </>):(<></>)}

                        <div className="input-group mb-3">
                            <span className="input-group-text"><PasswordIcon/></span>
                            <input 
                                className="form-control"
                                type="password" 
                                id="password" 
                                name= "password" 
                                placeholder="Contraseña"
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                        </div>
                        {formik.touched.password && formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
                       
                        <div className="input-group mb-3">
                            <span className="input-group-text"><PasswordIcon/></span>
                            <input 
                                className="form-control"
                                type="password" 
                                id="passwordVerification" 
                                name= "passwordVerification" 
                                placeholder="Confirma la contraseña"
                                onChange={formik.handleChange} 
                                onBlur={formik.handleBlur}
                                value={formik.values.passwordVerification || ''}
                            />
                        </div>
                        {formik.touched.passwordVerification && formik.errors.passwordVerification ? <div className="error mb-2">{formik.errors.passwordVerification}</div> : null}
                    
                    <div > 
                        <button className="btn btn-success"type="submit">Enviar</button>
                    </div>
                    {error && <p className="error">{message}</p>}
                </form>

            </Container>


        </div>
        

        {/* LOGIN CONFIRMATION */}
        <Snackbar open={showRegisterVerification} autoHideDuration={6000} onClose={handleCloseRegisterVerification }>
            <Alert onClose={handleCloseRegisterVerification } severity="success" sx={{ width: '100%' }}>
                Registrado correctamente!
            </Alert>
        </Snackbar>

        </>
    );

};
export default Register;