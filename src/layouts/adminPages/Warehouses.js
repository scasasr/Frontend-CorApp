import React, { useState,useEffect } from "react";
import {Modal, ModalBody, ModalHeader} from 'react-bootstrap';
import { useFormik } from "formik";
import * as Yup from "yup";
import { Snackbar,Alert } from "@mui/material";


//Icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import StoreIcon from '@mui/icons-material/Store';
import AbcIcon from '@mui/icons-material/Abc';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import HelpIcon from '@mui/icons-material/Help';
import SaveIcon from '@mui/icons-material/Save';
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';

//Conection to API
import API from '../../services/http-common.js';


const Warehouse = () =>{

    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [title,setTitle] = useState(''); 
    const [operation,setOperation] = useState('');
    const [warehouseId,setWarehouseId] = useState('');
    const [squareId,setSquareId] = useState('')

    const [initialValues,setInitialValues] = useState('');
    const [warehouseNumber,setWarehouseNumber] = useState('');
    const [warehouseCode,setWarehouseCode] = useState('');


    const[squaresData,setSquaresData] = useState([]);
    const[warehousesData,setWarehousesData] = useState([]);


    const[showModalDelete,setShowModalDelete] = useState('');
    
    const handleCloseModalDelete = () => setShowModalDelete(false);

    const handleShowModalDelete = (id,number,code) => {
        setShowModalDelete(true);
        setWarehouseId(id);
        setWarehouseNumber(number);
        setWarehouseCode(code);
    }


    const [showModalForm, setShowModalForm] = useState(false);

    const handleCloseModalForm = () => setShowModalForm(false);

    const handleShowModalForm =(op,id,numberWarehouse,idSquare,codeWarehouse) =>{
        setShowModalForm(true);
        setWarehouseId(id);

        if(op === 1){
            setTitle('Registrar bodega');
            setOperation('Register');
            setSquareId('');
            setInitialValues({
                number:'',
                square:'',
                code:''
            })
        }else if(op === 2){
            setTitle('Editar bodega');
            setOperation('Edit');
            setSquareId(idSquare);
            setInitialValues({
                number:numberWarehouse,
                square:idSquare,
                code:codeWarehouse
            })

        }
    }



    //Show send verification
    const [showSendVerification, setShowSendVerification] = useState(false);

    const handleCloseSendVerification = () => setShowSendVerification(false);




    const getSquares = async () =>{
            return await API.get('squares/all').then((response) =>{
            setSquaresData(JSON.parse(JSON.stringify(response.data)));
            // console.log(dataCountries);
        }).catch((error)=>{
            console.log(error);
        })
    };
    
    const getWarehouses = async () =>{
            return await API.get('warehouses/all').then((response) =>{
            setWarehousesData(JSON.parse(JSON.stringify(response.data)));
            // console.log(dataCountries);
        }).catch((error)=>{
            console.log(error);
        })
    };

    useEffect(()=>{
        getWarehouses();
    },[showSendVerification]);

    useEffect(()=>{
        getSquares();
    },[]);



    const formik  = useFormik({
        enableReinitialize: true,
        initialValues:initialValues,
        validationSchema:Yup.object({
            number:Yup.string().required("Este campo es requerido"),
            code:Yup.string().required("Este campo es requerido").min(5,"Codigo menor a 5 digitos").max(5,"Codigo excede los 5 digitos")
        }),
        onSubmit: values =>{
            // console.log('is here ')
            const warehouse_data =JSON.stringify(values, null, 2);

            if(operation === "Register"){
                API.post('warehouses/add',warehouse_data).then((response)=>{
                    if(response.status === 201){
                        formik.resetForm();
                        setShowSendVerification(true);
                    }
                    
                }).catch(error =>{
                    var error_data = error.response.data["error"] ;
                    if(error_data === "Error de servidor" || error_data === "Ya existe esta bodega" || error_data === "El id de la plaza no coincide con ninguna registrada"){
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
                console.log(warehouse_data);
                API.patch('warehouses/'+warehouseId,warehouse_data).then((response)=>{
                    if(response.status === 201){
                        // formik.resetForm();
                        // setSendVerification(true);
                        // setTimeout(() => setSendVerification(false),6000);
                        setShowSendVerification(true);
                    }
                    
                }).catch(error =>{
                    var error_data = error.response.data["error"] ;
                    if(error_data === "Error de servidor" || error_data === "No existe una plaza con este id"){
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


    const deleteWarehouse= () =>{
        API.delete('warehouses/'+warehouseId).then((response)=>{
            if(response.status === 201){
                // formik.resetForm();
                // setSendVerification(true);
                // setTimeout(() => setSendVerification(false),6000);
                setShowSendVerification(true);
                setShowModalDelete(false)
            }
        }).catch(error =>{
            var error_data = error.response.data["error"] ;
            if(error_data === "Error de servidor" || error_data === "No existe un país con este id"){
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

    return(
        <>
            <div className="App">
                <h1 className="pt-3">Bodegas</h1>
                        <div className="container-fluid">
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
                                                <th>id</th>
                                                <th>Numero</th>
                                                <th>Plaza</th>
                                                <th>Código</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-group-divider">
                                            {
                                                warehousesData.map((warehouse,id)=>(
                                                    <tr key={warehouse._id}>
                                                        <td>{warehouse._id}</td>
                                                        <td>{warehouse.number}</td>
                                                        <td>{squaresData.map((square,id)=>{
                                                                if(square._id === warehouse.square){
                                                                    return square.name;
                                                                }
                                                            })  
                                                            }</td>
                                                        <td>{warehouse.code}</td>
                                                        <td>   
                                                            <button onClick={()=> handleShowModalForm(2,warehouse._id,warehouse.number,warehouse.square,warehouse.code)} 
                                                            className="btn btn-warning">
                                                                <i><EditIcon/></i>
                                                            </button>
                                                            &nbsp;
                                                            <button onClick={()=> handleShowModalDelete(warehouse._id,warehouse.number,warehouse.code)} className="btn btn-danger">
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
                                    <span className="input-group-text"><LocalConvenienceStoreIcon /></span>
                                    <input 
                                        className="form-control"
                                        type="text" 
                                        id="number" 
                                        name= "number"
                                        placeholder="Número de la bodega"
                                        onChange={formik.handleChange} 
                                        onBlur={formik.handleBlur}
                                        value={formik.values.number} 
                                    />
                                </div >
                                {formik.touched.number && formik.errors.number ? <div className="error">{formik.errors.number}</div> : null}
                            
                                <div className="input-group mb-3">
                                    <span className="input-group-text"><StoreIcon/></span>
                                    <select name="square" id="square" className="form-control" aria-label="Default select example"
                                    defaultValue={(squareId === '') ? 'placeholder': squareId} onChange={formik.handleChange}  onBlur={formik.handleBlur}>
                                        <option value='placeholder'disabled>Seleccione una plaza</option>
                                        {squaresData.map((square,id) =>(
                                            <option key={id} value={square._id}>{square.name}</option>
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
                                <Modal.Title><HelpIcon/> Eliminar bodega</Modal.Title>
                        </ModalHeader>
                        <ModalBody>
                            <div className="Container">
                                <h5 className="mb-3">¿Está seguro que desea eliminar esta bodega con</h5>
                                <h5>Número: {warehouseNumber}</h5>
                                <h5 className="mb-2">Código: {warehouseCode}</h5>
                            </div>
                            <div className="d-flex justify-content-around mt-3">
                                <button onClick={deleteWarehouse} className="btn btn-success"><CheckIcon/>SI</button>
                                <button onClick={handleCloseModalDelete} className="btn btn-danger"><CloseIcon/>NO</button>
                            </div>

                        </ModalBody>
                    </Modal>
                </div>
        </>
    );

};

export default Warehouse;