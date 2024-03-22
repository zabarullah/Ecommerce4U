import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { CartContext } from '../../context/cart.context';
import Layout from '../../components/layout/layout.component';
import { useAuth } from '../../context/auth.context';
import { AlertContext } from '../../context/alert.context';

import './checkout.styles.css'

const CheckoutPage = () => {
  const { cartItems, removeFromCart, addToCart, removeItemFromCart, clearCart, getCartTotal } = useContext(CartContext);
  const {setAlert} = useContext(AlertContext);
  const [auth] = useAuth(); // Get the Auth state
  const [clientToken, setClientToken] = useState('');
  const [instance, setInstance] = useState('');
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();


  //Get Braintree Payment Gateway Token
  const getToken = async () => {
    try {
      const response = await axios.get('/api/v1/product/braintree/token');
      setClientToken(response.data?.clientToken);
    } catch (error) {
      console.log(error)
    }
  }


  //Payment
  const handlePayment = async () => {
    try {
      setLoading(true);

    // Created a shallow copy of cartItems with image data removed(as it was too large for the payment post request)
    const cartItemsWithoutImage = cartItems.map(item => {
      const { photo, ...itemWithoutPhoto } = item;
      return itemWithoutPhoto;
    });

      //create the nonce and send the payment, user and cart items to the server for processing of order and payment
      const {nonce} = await instance.requestPaymentMethod();
      const response = await axios.post('/api/v1/product/braintree/payment', {
        nonce,
        cartItems: cartItemsWithoutImage,
        cartTotal: getCartTotal(),
        user: auth?.user,
      });
      console.log('Payment Response: ', response)
      
      
      setLoading(false);
      //clear cart from local storage and the from context
      localStorage.removeItem('cart');
      clearCart();
      navigate('/dashboard/user/orders')
      setAlert({ type: 'success', message: 'Payment Successful' });
    } catch (error) {
      console.log(error);
      setLoading(false);
      setAlert({ type: 'error', message: 'Payment Failed' });
    }
  }

  useEffect(() => {
    getToken();
    console.log('FE - Cart: ', cartItems)
    console.log('FE- User: ', auth?.user)
  }, [auth?.token])

  return (
    <Layout title="Checkout">
      <div className="container mt-4 mb-4">
        
            {auth.user ? 
            (<h2>{`${auth.user.name}'s Checkout`}</h2>) 
            : 
            (<h2>Your Checkout</h2>)
            }
            
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
            <>
          <div className="row">
          <div className="table-responsive col-md-7">
            <table className="table table-hover">
              <thead>
                <tr style={{ borderBottom: '2px solid #dee2e6' }}>
                  <th scope="col" style={{ width: '75px'}}>Product</th>
                  <th scope="col" className="flex-grow-1 mx-2">Name</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Price</th>
                  <th scope="col">Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => (
                  <tr key={item._id} style={{ height: '100px', borderBottom: '1px solid #dee2e6' }}>
                    <td style={{ height: '100%', verticalAlign: 'middle',cursor: 'pointer'  }}>
                      <img
                        src={`/api/v1/product/product-photo/${item._id}`}
                        alt={item.name}
                        className="img-fluid rounded-start rounded-end shadow product-img"
                        style={{ height: '100%', width: 'auto' }}
                        onClick={() => navigate(`/product/${item.slug}`)}
                      />
                    </td>
                    <td style={{ width:'275px',  verticalAlign: 'middle', cursor: 'pointer'  }}
                        onClick={() => navigate(`/product/${item.slug}`)}
                    >{item.name}
                    </td>
                    <td style={{ width:'275px',  verticalAlign: 'middle' }}>
                      <div className="d-flex align-items-center">
                        <span className="btn me-2" onClick={() => removeFromCart(item)}>
                          &#10094;
                        </span>
                        <span>{item.quantity}</span>
                        <span className="btn ms-2" onClick={() => addToCart(item)}>
                          &#10095;
                        </span>
                      </div>
                    </td>
                    <td style={{ width:'275px',  verticalAlign: 'middle' }}>£{item.price.toFixed(2)*item.quantity}</td>
                    <td style={{ width:'275px',  verticalAlign: 'middle' }}>
                      <div className="btn " onClick={() => removeItemFromCart(item)}>
                        &#10005;
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          {cartItems.length > 0 && (
          <div className="mt-3">
            <button className="btn btn-danger me-2" onClick={clearCart}>
              Clear Checkout
            </button>
            
          </div>
        )}
          </div>
          
          <div className="col-md-5">
            <h2>Shipping Details</h2>
            <hr />
            <h4>Total: £{getCartTotal().toFixed(2)}</h4>
            <hr />
                
            {
                auth && auth.user && auth.user.address ? 
                (
                    <>
                        <div className="mb-3">
                            <h6>{`Name: ${auth?.user?.name}`}</h6>
                            <h6>{`Address: ${auth?.user?.address}`}</h6>
                            <hr />
                            <button 
                            className='btn btn-danger'
                            onClick={() => navigate('/dashboard/user/profile')}
                            >
                            Change Address
                            </button>
                        </div>
                    </>
                ) 
                : 
                (
                    <div className="mb-3">
                        {
                            auth?.token ? 
                            (
                                <button
                                className='btn btn-danger'
                                onClick={() => navigate('/dashboard/user/profile')}
                                >
                                Change Address
                                </button>
                            ) 
                            : 
                            (
                                <button
                                className='btn btn-secondary'
                                onClick={() => navigate('/login', {
                                    state: { path: "/checkout" },
                                })}
                                >
                                Login To Pay
                                </button>
                            )
                        }
                    </div>
                )
            }
            <div className="mt-2">
            {clientToken && auth?.token && cartItems.length ? (
                <>
                  <DropIn 
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: 'vault'
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  
                  <button 
                    className='btn btn-primary' 
                    onClick={handlePayment} 
                    disabled={loading}
                  >
                    {loading ? "Processing..." : "Pay Now"}
                  </button>
                </>
              ) : null}
            
            </div>

          </div>
          </div>
          </>
        )}
      </div>

    </Layout>
  );
};

export default CheckoutPage;
