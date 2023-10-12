import React, {useState, useEffect} from 'react'
import axios from 'axios';

import Layout from '../../components/layout/layout.component';
import AdminMenu from '../../components/adminMenu/adminMenu.component';


const CreateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState('');

    //get all Categories
    const getAllCategories = async () => {
        try {
            const response = await axios.get('/api/v1/category/get-category');
            if(response.data?.success) {
                setCategories(response.data.category);
             //   setAlert({type: 'success', message: response.data.message})
            }       
        } catch (error) {
            console.log(error);   
           // setAlert({type: 'error', message: error.response.data.message})         
        }
    }  

    useEffect(() => {
        getAllCategories();
    }, [])    


  return (
    <Layout title={"Dashboard- Create Product"}>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1>Create Product Page</h1>
                    <div className='m-1 w-75'>
                        <select 
                        className="form-select mb-3"  
                        onChange={(value) => {
                            setCategory(value);
                        }}
                        >
                            <option selected>Select a Category</option>
                        {
                            categories?.map((category) => (
                            <option key={category._id} value={category._id}>
                            {category.name}
                            </option>
                        ))
                        }
                        </select>
                    </div>


                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CreateProduct;