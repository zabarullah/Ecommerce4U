import React, {useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AlertContext } from '../../../src/context/alert.context.js';
import { useAuth } from "../../../src/context/auth.context.js";

import Layout from '../../components/layout/layout.component.js';
import AdminMenu from '../../components/adminMenu/adminMenu.component.js';
import Button from '../../components/button/button.component.js';


const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState('');
    const [photo, setPhoto] = useState('');
    const [auth] = useAuth(); // Get the Auth state
    const { alert, setAlert } = useContext(AlertContext);// to set the Alert type and message (alert displayed inside the Layout component)


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
        getAllCategories();
    }, [])    

    //handle create product function
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
          const productData = new FormData();
          productData.append("name", name);
          productData.append("description", description);
          productData.append("price", price);
          productData.append("quantity", quantity);
          productData.append("photo", photo);
          productData.append("category", category);
          productData.append("shipping", shipping);
          
          const response = await axios.post("/api/v1/product/create-product", 
          productData,
          {
            headers: {
                Authorization: auth.token
            }
          },
          );
          console.log('response log', response)
          if (response.data?.success) {
              setAlert({type: 'success', message: response.data.message}); 
              navigate('/dashboard/admin/products');  
           //   console.log('Alert data: ', alert)
          } 
        } catch (error) {
          console.log(error);
          setAlert({type: 'error', message: error.response.data.message});
        }
      };


  return (
    <Layout title="Dashboard- Create Product" alert={alert} setAlert={setAlert}>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1>Create Product Page</h1>
                    
                    <form onSubmit={handleCreateProduct}>
                        <div className='m-1 w-50'>
                            <select 
                            className="form-select mb-3"  
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}
                            >
                                <option value={''}>Select a Category</option>
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
                                    placeholder='Shipping'
                                    value={shipping}
                                    onChange={(e) => setShipping(e.target.value === 'true')}
                                >
                                    <option value={''}>
                                        Select Shipping
                                    </option>
                                    <option value={"true"}>
                                        Yes
                                    </option>
                                    <option value={"false"}>
                                        No
                                    </option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className='btn btn-outline-primary'>
                                    {photo? photo.name : "Upload Photo"}
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
                                {photo && (
                                    <div>
                                        <img 
                                            src={URL.createObjectURL(photo)} 
                                            alt='product' 
                                            height={'200px'} 
                                            className='img img-responsive'>
                                        </img>                            
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <Button>Create Product</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CreateProduct;