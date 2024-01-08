import React, { useState, useEffect, useContext } from 'react';
import Layout from '../../components/layout/layout.component';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart.context';
import { AlertContext } from '../../context/alert.context';

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { setAlert } = useContext(AlertContext);
  const params = useParams();
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      if (response.data?.success) {
        setProduct(response.data.product);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarProducts = async () => {
    try {
      const response = await axios.get(`/api/v1/product/get-similar-products/${product._id}`);
      if (response.data?.success) {
        setSimilarProducts(response.data.products);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [params.slug]);
  
  useEffect(() => {
    if (product) {
      fetchSimilarProducts();
    }
  }, [product]);  
  


  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or any other loading indicator
  }

  if (!product) {
    return <div>Product not found</div>; // You can create a more user-friendly error message
  }

  //adding the product to the cart
  const handleAddToCart = (productToAdd) => {
    addToCart(productToAdd)
  //console.log('Added to cart:', productToAdd.name);
    setAlert({ type: 'success', message: `${productToAdd.name} Added To Cart` });
  };

  return (
    <Layout title={product.name} >
      <div className="container mt-4 text-center">
        <div className="row ">
            <div className="card mb-3 text-center" >
                <div className="row g-0 ">
                    <div className="col-md-4 p-3">
                        <img
                            src={`/api/v1/product/product-photo/${product._id}`}
                            alt={product.name}
                            className="img-fluid rounded-start rounded-end shadow"
                            width="300px"
                        />
                    </div>
                    <div className="col-md-8 d-flex flex-column justify-content-between">
                        <div className="card-body d-flex flex-column justify-content-between">
                            <h5 className="card-title card-header mb-3">{product.name}</h5>
                            <p className="card-text">Description: {product.description}</p>
                            <p className="card-text"><small className="text-body-secondary">Category: {product.category.name}</small></p>
                            <div className="card-footer d-flex justify-content-between">
                                <p className="card-text">Price: {product.price}</p>
                                <button className="btn btn-primary" 
                                onClick={() => (handleAddToCart(product))}
                                >
                                Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row mt-4 ">
          <h3>Products related to this product</h3>
          {similarProducts.map((similarProduct) => (
            <div className="col-md-4 mb-4 d-flex justify-content-center" key={similarProduct._id}>
              <div className="card" style={{ width: '18rem', height: '450px' }}>
                <div style={{height: '60%'}}>
                    <img
                    src={`/api/v1/product/product-photo/${similarProduct._id}`}
                    alt={similarProduct.name}
                    className="card-img-top"
                    style={{ height: '100%', objectFit: 'cover' }}
                    />
                    <div className="card-body h-40 text-center">
                    <h5 className="card-title">{similarProduct.name}</h5>
                    <p className="card-text">{product.description.substring(0,30)}...</p>
                    <p className="card-text">£{similarProduct.price}</p>
                    <button className="btn btn-primary ms-1" 
                    onClick={() => navigate(`/product/${similarProduct.slug}`)}>More details</button>
                    <button className="btn btn-secondary ms-1" 
                            onClick={() => (handleAddToCart(similarProduct))}
                    >
                    Add To Cart</button>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
