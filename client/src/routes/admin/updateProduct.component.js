import React, {useState, useEffect, useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { AlertContext } from '../../../src/context/alert.context.js';
import { useAuth } from "../../../src/context/auth.context.js";

import Layout from '../../components/layout/layout.component.js';
import AdminMenu from '../../components/adminMenu/adminMenu.component.js';
import CategoryForm from '../../components/forms/category.form.js';
import Modal from '../../components/modal/modal.component.js';

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState('');
    const [photo, setPhoto] = useState('');
    const [id, setId] = useState('');
    const [modalHeading, setModalheading] = useState('');
    const [action, setAction] = useState('');
    const [auth] = useAuth(); // Get the Auth state
        const { alert, setAlert } = useContext(AlertContext);// to set the Alert type and message (alert displayed inside the Layout component)

    //get single Product
    const getSingleProduct = async () => {
        try {
            const response = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            if (response?.data) {
                const product = response.data.product;
                setCategory(product.category._id);
                setId(product._id);
                setName(product.name);
                setDescription(product.description);
                setPrice(product.price);
                setQuantity(product.quantity);
                setShipping(product.shipping);
                //console.log(response)

            }
        } catch (error) {
            console.log(error);   
            setAlert({type: 'error', message: error.response.data.message})             
        }
    }

    //get all Categories
    const getAllCategories = async () => {
        try {
            const response = await axios.get('/api/v1/category/get-category');
            if(response.data?.success) {
                setCategories(response.data.category);
                setAlert({type: 'success', message: response.data.message})
            }       
        } catch (error) {
            console.log(error);   
            setAlert({type: 'error', message: error.response.data.message})         
        }
    }  

    useEffect(() => {
        // eslint-disable-next-line
        getSingleProduct();
        // eslint-disable-next-line
        getAllCategories();
    }, [])    

    //handle create product function
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
          const productData = new FormData();
          productData.append("name", name);
          productData.append("description", description);
          productData.append("price", price);
          productData.append("quantity", quantity);
          photo && productData.append("photo", photo);
          productData.append("category", category);
          productData.append("shipping", shipping);
          
          const response = await axios.put(`/api/v1/product/update-product/${id}`, 
          productData,
          {
            headers: {
                Authorization: auth.token
            }
          },
          );
          console.log('response log', response)
          if (response.data?.success) {
              setAction(null);
              setAlert({type: 'success', message: response.data.message}); 
              navigate('/dashboard/admin/products')
          } 
        } catch (error) {
          console.log(error);
          setAlert({type: 'error', message: error.response.data.message});
        }
      };
    
      //Delete a product
    const handleDelete = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`/api/v1/product/delete-product/${id}`,
            {
              headers: {
                  Authorization: auth.token
              }
            },
            );

            if (response.data?.success) {
                setAction(null);
                setAlert({type: 'success', message: response.data.message}); 
                navigate('/dashboard/admin/products')
            } 
        } catch (error) {
            console.log(error);
            setAlert({type: 'error', message: error.response.data.message});            
        }
    }  

        // handle action
        const handleAction = () => {
            
            try {
                if (action !== null) {
                    if (action === 'handleUpdate') {
                        console.log('handle update action executed')
                        return handleUpdate(); // Assuming handleUpdate is an async function
                    } else if (action === 'handleDelete') {
                        console.log('handle delete action executed')
                        return handleDelete(); // Assuming handleDelete is an async function
                    } 
                } 
                
            } catch (error) {
                console.log(error);
            }
        }

  return (
    <Layout title="Dashboard- Update Product" alert={alert} setAlert={setAlert}>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1>Update Product Page</h1>
                    
{/* form tag had to be removed as the buttons clicked was triggered default submitting of the form */}
                        <div className='m-1 w-50'>
                            <select 
                            className="form-select mb-3" 
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}
                            value={category}
                            >
                                <option value={''}>{category ? category : 'Select a category'}</option>
                            {
                                categories?.map((category) => (
                                <option key={category._id} value={category._id}>
                                {category.name}
                                </option>
                            ))
                            }
                            </select>
                            <div className="mb-3">
                                <input type='text'
                                    value={name}
                                    placeholder='Name of the product'
                                    className='form-control'
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <textarea type='text'
                                    value={description}
                                    placeholder='Enter the product description'
                                    className='form-control'
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input type='number'
                                    value={price}
                                    placeholder='Price'
                                    className='form-control'
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <input type='number'
                                    value={quantity}
                                    placeholder='Quantity'
                                    className='form-control'
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <select type='text' 
                                    className='form-select mb-3'
                                    value={shipping}
                                    placeholder='Shipping'
                                    onChange={(e) => setShipping(e.target.value)}
                                >
                                <option value={''}>
                                    {shipping ? (shipping === "true" ? 'Yes' : 'No') : 'Select Shipping'}
                                </option>

                                    <option value={'true'}>
                                        Yes
                                    </option>
                                    <option value={'false'}>
                                        No
                                    </option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className='btn btn-outline-primary'>
                                    {photo? photo.name : "Edit Photo"}
                                    <input 
                                        type="file" 
                                        name="photo" 
                                        accept='image/*' 
                                        onChange={(e) => setPhoto(e.target.files[0])}
                                        key={photo}
                                        hidden
                                    />
                                        
                                </label>
                                {photo && (
                                        <button className='btn btn-danger ms-3' 
                                        onClick={() => setPhoto('')}
                                        >
                                        Remove Photo
                                        </button>
                                )}
                            </div>
                            <div className="mb-3">
                                {photo ? (
                                    <div>
                                        <img 
                                            src={URL.createObjectURL(photo)} 
                                            alt='product' 
                                            height={'200px'} 
                                            className='img img-responsive'>
                                        </img>                            
                                    </div>
                                 ) : (
                                    <div>
                                        <img 
                                            src={`/api/v1/product/product-photo/${id}`} 
                                            alt='product' 
                                            height={'200px'} 
                                            className='img img-responsive'>
                                        </img>                            
                                    </div>                                    
                                 )
                                }
                            </div>
                            <div className="mb-3">
                            <button 
                                className='btn btn-primary ms-2'
                                data-bs-toggle="modal" 
                                data-bs-target="#Modal"
                                onClick={() => {
                                    setModalheading(`Update ${name} Product?`)
                                    setAction('handleUpdate')
                                }}
                                > 
                                Update 
                                </button> 

                                <button 
                                className='btn btn-danger ms-2'
                                data-bs-toggle="modal" 
                                data-bs-target="#Modal"
                                onClick={() => {
                                    setModalheading(`Delete ${name} Product?`)
                                    setAction('handleDelete')
                                }}
                                > 
                                Delete 
                                </button> 

                            </div>
                        </div>

                                <Modal class="modal fade" 
                                    id="Modal" 
                                    tabindex="-1" 
                                    aria-labelledby="exampleModalLabel" 
                                    aria-hidden="true" 
                                    modalHeading={modalHeading}                                    
                                >
                                    
                                    {action === 'handleUpdate' && (
                                        <button
                                        type="button"
                                        className="btn btn-primary"
                                        data-bs-dismiss="modal"
                                        onClick={(e) => {
                                            handleUpdate(e);
                                        }}
                                        >
                                        Confirm Update
                                        </button>
                                    )}

                                    {action === 'handleDelete' && (
                                        <button
                                        type="button"
                                        className="btn btn-danger ms-2"
                                        data-bs-dismiss="modal"
                                        onClick={(e) => {
                                            handleDelete(e);
                                        }}
                                        >
                                        Confirm Delete
                                        </button>
                                    )}

                                </Modal>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default UpdateProduct;