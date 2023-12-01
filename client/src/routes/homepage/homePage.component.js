import React, { useState, useEffect, useContext } from 'react';
import Layout from '../../components/layout/layout.component';
import axios from 'axios';
import { AlertContext } from '../../context/alert.context';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const { alert, setAlert } = useContext(AlertContext);

  // get all Categories
  const getAllCategories = async () => {
    try {
      const response = await axios.get('/api/v1/category/get-category');
      if (response.data?.success) {
        setCategories(response.data.category);
      }
    } catch (error) {
      console.log(error);
      setAlert({ type: 'error', message: error.response.data.message });
    }
  };

  // get all products
  const getAllProducts = async () => {
    try {
      const response = await axios.get('/api/v1/product/get-products');
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        setAlert({ type: 'error', message: 'Error In getting Products' });
      }
    } catch (error) {
      console.log(error);
      setAlert({ type: 'error', message: error.response.data.message });
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllProducts();
    // eslint-disable-next-line
  }, []);

  const handleCategoryChecked = (categoryId) => {
    const isChecked = checkedCategories.includes(categoryId);

    if (isChecked) {
      // Category is already checked, remove it
      setCheckedCategories((prevState) => prevState.filter((id) => id !== categoryId));
    } else {
      // Category is not checked, add it
      setCheckedCategories((prevState) => [...prevState, categoryId]);
    }
  };

  const filterProducts = () => {
    // If no categories are checked, show all products
    if (checkedCategories.length === 0 && !minPrice && !maxPrice) {
      return products;
    }

    // Filter products based on checked categories
    return products.filter((product) => {
      const isInCategories = checkedCategories.includes(product.category._id);
      const isInPriceRange = 
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice) 

      return isInCategories || isInPriceRange;

  });
  };
  // separate variable filteredProducts so that it can be mapped to display the filtered products
  const filteredProducts = filterProducts();

  return (
    <Layout title="Home Page - Ecommerce 4 U" alert={alert} setAlert={setAlert}>
      <div className="row mt-3">
        <div className="col-md-3">
          <h4 className="text-center">Filter by Category</h4>
          {categories?.map((category) => (
            <div key={category._id} className="input-group-text ms-3">
              <input
                className="form-check-input"
                type="checkbox"
                value={category._id}
                checked={checkedCategories.includes(category._id)} // to see if category is checked or not to render that category checkbox - essentially true or false
                onChange={() => handleCategoryChecked(category._id)}
              />
              <h6 className="ms-2">{category.name}</h6>
              
            </div>
            
          ))}
          <h4 className="text-center mt-3">Filter By Price</h4>
          <div className="input-group-text ms-3">
            <input 
              className='form-control'
              type='number'
              placeholder='Min Price'
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input 
              className='form-control'
              type='number'
              placeholder='Max Price'
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {filteredProducts?.map((product) => (
              <div className="card m-2" style={{ width: '18rem' }} key={product._id}>
                <div>
                  <img
                    src={`/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: '20rem' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description.substring(0,30)}...</p>
                    <p className="card-text">£{product.price}</p>
                    <button className="btn btn-primary ms-1">More details</button>
                    <button className="btn btn-secondary ms-1">Add To CART</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
