import React, { useState, useEffect, useContext } from 'react';
import Layout from '../../components/layout/layout.component';
import axios from 'axios';
import { AlertContext } from '../../context/alert.context';
import Pagination from '../../components/pagination/pagination.component';
import { useLocation, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // used to grab the category state from categories nav menu and categories page
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checkedCategories, setCheckedCategories] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState('')
  const [searchTerm, setSearchTerm] = useState('');
  const { alert, setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (location?.state) {
      setCheckedCategories(location?.state?.checkedCategories);
      // re-set state:after checkedCategories is setwith location.state.checkedCategories, i want to remove location.state so that the category doesnt stick on checked:
      navigate({ state: null });
    }
    //console.log('State: ',location.state);
  }, [location?.state]);

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


  const getPaginatedProducts = async () => {
    try {
      const response = await axios.get(`/api/v1/product/get-products`, {
        params: {
            page: currentPage,
            limit: 3,
            categories: checkedCategories,
            minPrice,
            maxPrice,
            searchTerm,  
        },
    });
  
      if (response.data.success) {
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setTotalProducts(response.data.total);

        //console.log('The search term is ', searchTerm)
      } else {
        setAlert({ type: 'error', message: 'Error In getting Products' });
      }
    } catch (error) {
      console.log(error);
      setAlert({ type: 'error', message: error.response.data.message });
    }
  };
  
  useEffect(() => {
    // Reset to the first page if the current page is greater than the new total pages (its needed when priceRange changes forces lower filteredProducts thus requireing lower totalPages)
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }

    // Reset to the first page if the current page is more than the new searches totalPages(assigned here as maxValidPage) & current page is not page 1 & if there are not products
    const maxValidPage = Math.ceil(totalProducts / 6); // Assuming you have 6 products per page
    if (currentPage <= maxValidPage && currentPage !== 1 && filteredProducts.length === 0) {
      setCurrentPage(1);
    }

    getAllCategories();
    getPaginatedProducts();
    // eslint-disable-next-line
  }, [currentPage, checkedCategories, minPrice, maxPrice, totalPages,totalProducts, searchTerm]);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [totalProducts]);

 
  
  const handleCategoryChecked = (categoryId) => {
    const isChecked = checkedCategories.includes(categoryId);
    if (isChecked) {
      // if the Category is already checked, remove it(uncheck)
      setCheckedCategories((prevState) => prevState.filter((id) => id !== categoryId));
      console.log('Checked Categories after handleCategoryChecked:', checkedCategories);
    } else {
      // Category is not checked, add it(check)
      setCheckedCategories((prevState) => [...prevState, categoryId]);
      console.log('Checked Categories after handleCategoryChecked:', checkedCategories);
    }
  
    // Reset page to 1 when categories change
    setCurrentPage(1);
  };
  

  //Filters products based on checked or unchecked categories and/or price range 
  const filterProducts = () => {
    // If no categories are checked and no price range, show all products
    if (checkedCategories.length === 0 && !minPrice && !maxPrice) {
      return products;
    }
  
    // Filter products based on checked categories and/or Price range
    return products.filter((product) => {
      // Check if there are no categories selected or if the product is in the selected categories. we have to check first condition because if we dont have any categories checked the second condition will return false which excludes all products, to return true add the first condition
      const isInCategories = checkedCategories.length === 0 || checkedCategories.includes(product.category._id);
  
      // Check if there's no minPrice specified or if the product price is greater than or equal to minPrice, and there's no maxPrice specified or if the product price is less than or equal to maxPrice
      const isInPriceRange = 
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice);
      
      // Return true if the product is in the selected categories and in the specified price range
      return isInCategories && isInPriceRange;
    });
  };
  
  // separate variable filteredProducts so that it can be mapped to display the filtered products
  const filteredProducts = filterProducts();

  //resetting each filter by its filter type(from the button)
  const resetFilter = (filterType) => {
    switch (filterType) {
      case 'categories':
        setCheckedCategories([]);
        break;
      case 'price':
        setMinPrice('');
        setMaxPrice('');
        break;
      case 'all':
        setCheckedCategories([]);
        setMinPrice('');
        setMaxPrice('');
        setSearchTerm('');
        break;
      default:
        // Do nothing for unknown filter types
        break;
    }
  };

  return (
    <Layout title="Home Page - Ecommerce 4 U" alert={alert} setAlert={setAlert}>
      <div className="row mt-3 ms-1">
        <div className="col-md-3">
          <h4 className="text-center border-bottom">Filter by Category</h4>
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
          <div className="d-grid gap-2 col-6 mx-auto mt-2">
          <button className="btn btn-secondary mb-2" onClick={() => resetFilter('categories')}>
            Reset Categories
          </button>
          </div>
          <h4 className="text-center mt-3 border-bottom">Filter by Price</h4>
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
          <div className="d-grid gap-2 col-6 mx-auto mt-2">
            <button className="btn btn-secondary mb-2" onClick={() => resetFilter('price')}>
                Reset Price
            </button>

          </div>
          <h4 className="text-center mt-3 border-bottom">Search Products</h4>
          <div className="input-group-text ms-3">
          <input
              className='form-control'
              type='text'
              placeholder='Search Products'
              value={searchTerm}
              onChange={(e) => {
                //console.log('Search Term:', e.target.value); working
                setSearchTerm(e.target.value)
              }}
            />
          </div>
          <div  className="text-center mt-3">
            <button className="btn btn-primary mt-3" onClick={() => resetFilter('all')}>
                Reset All Filters
            </button>
          </div>
        </div>

        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div>
              <h6>{`Number of Products: ${totalProducts}`}</h6>
          </div>
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
                    <button className="btn btn-primary ms-1" 
                    onClick={() => navigate(`/product/${product.slug}`)}>More details</button>
                    <button className="btn btn-secondary ms-1">Add To Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination controls */}
          <div className="d-flex justify-content-center mt-3">
            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage}/>
            {/* <div>
              <h6>{`Current page: ${currentPage} of total ${totalPages}`}</h6>
              <h6>{`Number of Products in Category: ${totalProducts}`}</h6>
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
