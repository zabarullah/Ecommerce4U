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
    // If no categories are checked and no price range, show all products
    if (checkedCategories.length === 0 && !minPrice && !maxPrice) {
      return products;
    }
  
    // Filter products based on checked categories and/or Price range
    return products.filter((product) => {
      // Check if there are no categories selected or if the product is in the selected categories. we have to check first condition 
      //because if we dont have any categories checked the second condition will return false which excludes all products, 
      //to return true add the first condition
      const isInCategories = checkedCategories.length === 0 || checkedCategories.includes(product.category._id);
  
      // Check if there's no minPrice specified or if the product price is greater than or equal to minPrice,
      // and there's no maxPrice specified or if the product price is less than or equal to maxPrice
      const isInPriceRange = 
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice);
  
      // Return true if the product is in the selected categories and in the specified price range
      return isInCategories && isInPriceRange;
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
              <div className="card m-2" style={{ width: '18rem', height: '500px' }} key={product._id}>
                <div style={{height: '60%'}}>
                  <img
                    src={`/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top img-fluid"
                    alt={product.name}
                    style={{ height: '100%', objectFit: 'cover' }}
                  />
                  <div className="card-body h-40">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description.substring(0,30)}...</p>
                    <p className="card-text">£{product.price}</p>
                    <button className="btn btn-primary ms-1">More details</button>
                    <button className="btn btn-secondary ms-1">Add To Cart</button>
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
