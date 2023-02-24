import React, { useState,useEffect } from "react";
import axios from "axios";
import {Modal, ModalBody, ModalHeader} from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Snackbar,Alert } from "@mui/material";


//Icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AbcIcon from '@mui/icons-material/Abc';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';
import SaveIcon from '@mui/icons-material/Save';
import CategoryIcon from '@mui/icons-material/Category';
import StyleIcon from '@mui/icons-material/Style';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

//Conection to API
import API from '../../services/http-common.js';

const Products = () =>{

    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [title,setTitle] = useState(''); 
    const [operation,setOperation] = useState('');
    const [productId,setProductId] = useState('');
    const [categoryId,setCategoryId] = useState('');

    const [file,setFile] =useState();
    const [nameImage,setNameImage] =useState('Default')
    const [pathImage,setPathImage] = useState('http://3.144.130.111:4000/imagesProducts/logo.png');

    const [initialValues,setInitialValues] = useState('');
    const [productName,setProductName] = useState('');
    const [productCode,setProductCode] = useState('');


    const[productsData,setProductsData] = useState([]);
    const[categoriesData,setCategoriesData] = useState([]);


    const[showModalDelete,setShowModalDelete] = useState('');
    
    const handleCloseModalDelete = () => setShowModalDelete(false);

    const handleShowModalDelete = (id,name,code) => {
        setShowModalDelete(true);
        setProductId(id);
        setProductName(name);
        setProductCode(code);
    }


    const [showModalForm, setShowModalForm] = useState(false);

    const handleCloseModalForm = () => setShowModalForm(false);

    const handleShowModalForm =(op,id,productName,category,urlPhoto,productCode) =>{
        setShowModalForm(true);
        setProductId(id);

        if(op === 1){
            setPathImage("http://3.144.130.111:4000/imagesProducts/logo.png");
            setTitle('Registrar producto');
            setOperation('Register');
            setCategoryId('');
            setInitialValues({
                name:'',
                category:'',
                photo:'',
                code:''
            })
        }else if(op === 2){
            setTitle('Editar producto');
            setOperation('Edit');
            setPathImage(urlPhoto);
            setNameImage(urlPhoto.substring(35,))
            // console.log(pathImage)
            setCategoryId(category);
            setInitialValues({
                name:productName,
                category:category,
                photo:urlPhoto,
                code:productCode
            })

        }
    }



    //Show send verification
    const [showSendVerification, setShowSendVerification] = useState(false);

    const handleCloseSendVerification = () => setShowSendVerification(false);




    const getCategories = async () =>{
            return await API.get('categories/all').then((response) =>{
            setCategoriesData(JSON.parse(JSON.stringify(response.data)));
            // console.log(dataCountries);
        }).catch((error)=>{
            console.log(error);
        })
    };
    
    const getProducts = async () =>{
            return await API.get('products/all').then((response) =>{
            setProductsData(JSON.parse(JSON.stringify(response.data)));
            // console.log(dataCountries);
        }).catch((error)=>{
            console.log(error);
        })
    };

    const saveImages = (name,file) =>{
       const form  = new FormData();
       form.append('name',name);
       form.append('file',file,'form-data')

       return axios.post("http://3.144.130.111:4000/uploadImages",form);
    }


    useEffect(()=>{
        getProducts();
    },[showSendVerification]);

    useEffect(()=>{
        getCategories();
    },[]);





    const formik  = useFormik({
        enableReinitialize: true,
        initialValues:initialValues,
        validationSchema:Yup.object({
            name:Yup.string().required("Este campo es requerido").matches( /^[a-zA-ZÀ-ÿ\s]{1,40}$/,"Solo permite letras y espacios"),
            code:Yup.string().required("Este campo es requerido").min(5,"Codigo menor a 5 digitos").max(5,"Codigo excede los 5 digitos"),
            photo:Yup.string().required("Este Campo es requerido")
        }),
        onSubmit: values =>{
            // console.log('is here ')
            const product_data =JSON.stringify(values, null, 2);



            if(operation === "Register"){
                saveImages(nameImage,file);
                console.log(product_data);
                API.post('products/add',product_data ).then((response)=>{
                    if(response.status === 201){
                        formik.resetForm();
                        setPathImage("http://3.144.130.111:4000/imagesProducts/logo.png");
                        setShowSendVerification(true);
                    }
                    
                }).catch(error =>{
                    var error_data = error.response.data["error"] ;
                    if(error_data === "Error de servidor" || error_data === "Ya existe este producto" || error_data === "No existe una categoria con este id"){
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

            }else if(operation === "Edit"){
                console.log(product_data);
                API.patch('products/'+productId,product_data ).then((response)=>{
                    if(response.status === 201){
                        // formik.resetForm();
                        // setSendVerification(true);
                        // setTimeout(() => setSendVerification(false),6000);
                        setShowSendVerification(true);
                    }
                    
                }).catch(error =>{
                    var error_data = error.response.data["error"] ;
                    if(error_data === "Error de servidor" || error_data === "No existe un producto con este id"){
                        setMessage(error_data);
                        setError(true)
                        setTimeout(() => setError(false),4000);
                    }else{
                        setMessage(error_data);
                        setError(true);  
                        // navigate(("/")); 
                        setTimeout(() => setError(false),4000);
                    }
                });
            }
             
        },
    });


    const deleteProduct= () =>{
        API.delete('products/'+productId).then((response)=>{
            if(response.status === 201){
                // formik.resetForm();
                // setSendVerification(true);
                // setTimeout(() => setSendVerification(false),6000);
                setShowSendVerification(true);
                setShowModalDelete(false)
            }
        }).catch(error =>{
            var error_data = error.response.data["error"] ;
            if(error_data === "Error de servidor" || error_data === "No existe un producto con este id"){
                console.log(error_data);
                // setMessage(error_data);
                // setError(true)
                // setTimeout(() => setError(false),4000);
            }else{
                console.log(error_data);
                // setMessage(error_data);
                // setError(true);  
                // navigate(("/")); 
                // setTimeout(() => setError(false),4000);
            }
        });


    }

    const onChange= (e) => {
        if(e.target.files && e.target.files.length > 0){
            const file =e.target.files[0] 
            if(file.type.includes("image")){
                const reader = new  FileReader()
                reader.readAsDataURL(file)

                reader.onload = function load(){
                    setPathImage(reader.result)
                }
                setFile(file)
                setNameImage(file.name)
                formik.values.photo = nameImage
            }
        }else{
            setPathImage("http://3.144.130.111:4000/imagesProducts/logo.png");
            formik.errors.photo="No hay una imagen cargada"
        }
        // console.log("field value change");
        // console.log(formik.values.photo)
        formik.handleChange(e);
      }



    return(
        <>
            <div className="App">
                <h1 className="pt-3">Productos</h1>
                        <div className="container-fluid_">
                            <div className="mt-3">
                                <div className="col-md-4 offset-md-4">
                                    <div className="d-grid mx-auto">
                                        <button className="btn btn-dark" onClick={() => handleShowModalForm(1) }>
                                            <AddCircleOutlineIcon/>Añadir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="col-12 col-lg-12 offset-0 offset-lg-12">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                {/* <th>id</th> */}
                                                <th>Foto</th>
                                                <th>Nombre</th>
                                                <th>Categoria</th>
                                                <th>Código</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider">
                                            {
                                                productsData.map((product,id)=>(
                                                    <tr key={product._id}>
                                                        {/* <td>{product._id}</td> */}
                                                        <td><img className="img-fluid img-thumbnall"style={{borderRadius:"10px",height:"100px",width:"150px"}}
                                                            src={product.photo} alt={nameImage}/></td>
                                                        <td>{product.name}</td>
                                                        <td>{categoriesData.map((category,id)=>{
                                                                if(category._id === product.category){
                                                                    return category.name;
                                                                }
                                                            })  
                                                            }</td>
                                                        <td>{product.code}</td>
                                                        <td>   
                                                            <button onClick={()=> handleShowModalForm(2,product._id,product.name,product.category,product.photo,product.code)} 
                                                            className="btn btn-warning">
                                                                <i><EditIcon/></i>
                                                            </button>
                                                            &nbsp;
                                                            <button onClick={()=> handleShowModalDelete(product._id,product.name,product.code)} className="btn btn-danger">
                                                                <i><DeleteIcon/></i>
                                                            </button>  
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                    </div>
                    <Modal show={showModalForm} onHide={handleCloseModalForm}>
                        <ModalHeader closeButton>
                            <Modal.Title>{title}</Modal.Title>
                        </ModalHeader>
                        <ModalBody>
                            <form className="form mt-0" onSubmit={formik.handleSubmit}>
                                <div className="input-group mb-3">
                                    <span className="input-group-text"><CategoryIcon/></span>
                                    <input 
                                        className="form-control"
                                        type="text" 
                                        id="name" 
                                        name= "name"
                                        placeholder="Nombre del producto"
                                        onChange={formik.handleChange} 
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name} 
                                    />
                                </div >
                                {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
                            
                                <div className="input-group mb-3">
                                    <span className="input-group-text"><StyleIcon/></span>
                                    <select name="category" id="category" className="form-control" aria-label="Default select example"
                                    defaultValue={(categoryId === '') ? 'placeholder': categoryId} onChange={formik.handleChange}  onBlur={formik.handleBlur}>
                                        <option value='placeholder'disabled>Seleccione una categoria</option>
                                        {categoriesData.map((category,id) =>(
                                            <option key={id} value={category._id}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="input-group mb-3">
                                <span className="input-group-text"><AbcIcon/></span>
                                    <input 
                                        className="form-control"
                                        type="text" 
                                        id="code" 
                                        name= "code" 
                                        placeholder="Código"
                                        onChange={formik.handleChange}
                                        
                                        value={formik.values.code} 
                                    />
                                </div>
                                {formik.touched.code && formik.errors.code ? <div className="error">{formik.errors.code}</div> : null}
                            
                                <div className="input-group mb-3">
                                    <span className="input-group-text"><AddPhotoAlternateIcon/></span>
                                    <input 
                                        className="form-control"
                                        type="file" 
                                        id="photo" 
                                        name= "photo" 
                                        placeholder="Subir imagen"
                                        onChange={onChange}
                                        // value={formik.values.p} 
                                    >
                                    </input>
                                </div>
                                {formik.errors.photo ? <div className="error">{formik.errors.photo}</div> : null}
                                <p className="mt-4" style={{fontSize:"10px"}}>Previsualización</p>
                                <div className="d-flex justify-content-center">
                                    <img className="img-fluid img-thumbnall mt-1 mb-3 "style={{borderRadius:"10px",borderStyle:"inset",height:"300px"}}
                                        src={pathImage} alt={nameImage}/>      
                                </div>

                                <div> 
                                    <button className="btn btn-success" type="submit"><SaveIcon className="mr-1"/>Guardar</button>
                                </div>
                                {error && <p className="error mt-2">{message}</p>}
                            
                            </form>
                        </ModalBody>
                    </Modal>
                    {/* successful form submission information */}
                    <Snackbar open={showSendVerification} autoHideDuration={6000} onClose={handleCloseSendVerification}>
                        <Alert onClose={handleCloseSendVerification} severity="success" sx={{ width: '100%' }}>
                            Formulario enviado con exito
                        </Alert>
                    </Snackbar>
                     {/* clients deletion confirmation modal*/}
                    <Modal show={showModalDelete} onHide={handleCloseModalDelete}>
                        <ModalHeader closeButton>
                                <Modal.Title><HelpIcon/> Eliminar producto</Modal.Title>
                        </ModalHeader>
                        <ModalBody>
                            <div className="Container">
                                <h5 className="mb-3">¿Está seguro que desea eliminar este producto con</h5>
                                <h5>Nombre: {productName}</h5>
                                <h5 className="mb-2">Código: {productCode}</h5>
                            </div>
                            <div className="d-flex justify-content-around mt-3">
                                <button onClick={deleteProduct} className="btn btn-success"><CheckIcon/>SI</button>
                                <button onClick={handleCloseModalDelete} className="btn btn-danger"><CloseIcon/>NO</button>
                            </div>

                        </ModalBody>
                    </Modal>
                </div>
        </>
    );

};

export default Products;