import React, {useState, useEffect, useContext} from 'react'

import Layout from '../../components/layout/layout.component';
import AdminMenu from '../../components/adminMenu/adminMenu.component';

import './product.component.css'

import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { AlertContext } from '../../context/alert.context';

const Products = () => {
    const [products, setProducts] = useState([]);
    const { setAlert } = useContext(AlertContext);// to set the Alert type and message (alert displayed inside the Layout component)
    const navigate = useNavigate();

    const getAllProducts = async () => {
        try {
            const response = await axios.get('/api/v1/product/get-products');
            if(response.data.success) {
                setProducts(response.data.products)
                setAlert({type: 'success', message: response.data.message})
               
            } else {
                setAlert({type: 'error', message: "Error In getting Products"})
            }           
        } catch (error) {
            console.log(error) 
            setAlert({type: 'error', message: error.response.data.message})           
        }
    }

    useEffect(() => {
        getAllProducts();
        // eslint-disable-next-line
    },[])

  return (
    <Layout title="Dashboard- Products"> 
    
        <div className='container-fluid m-3 p-3'>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1>All Products List</h1>
                    <div className="d-flex">
                    {
                        products?.map(product => (
                            // <Link key={product._id} to={`/dashboard/admin/product/${product.slug}`} className="product-link">
                            // <div className="card m-2" style={{width: "18rem"}}>
                            //     <div>
                            //         <img src={`/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name} />
                            //     <div className="card-body">
                            //         <h5 className="card-title">{product.name}</h5>
                            //         <p className="card-text">{product.description}</p>
                            //     </div>
                            //     </div>
                            // </div>
                            // </Link>
                            <div className="card m-2" style={{ width: '18rem', height: '500px' }} key={product._id}>
                            <div style={{ height: '60%' }}>
                              <img
                                src={`/api/v1/product/product-photo/${product._id}`}
                                className="card-img-top img-fluid"
                                alt={product.name}
                                style={{ height: '100%', objectFit: 'cover' }}
                              />
                              <div className="card-body h-40">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description.substring(0, 30)}...</p>
                                <p className="card-text">£{product.price}</p>
                                <button
                                  className="btn btn-primary ms-1"
                                  onClick={() => navigate(`/product/${product.slug}`)}
                                >
                                  More details
                                </button>
                              </div>
                            </div>
                            </div>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Products;