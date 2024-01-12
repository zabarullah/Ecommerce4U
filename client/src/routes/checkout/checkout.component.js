import React, { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import Layout from '../../components/layout/layout.component';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth.context';

const CheckoutPage = () => {
  const { cartItems, removeFromCart, addToCart, removeItemFromCart,clearCart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();
  const [auth] = useAuth(); // Get the Auth state

  return (
    <Layout title="Checkout">
      <div className="container mt-4 mb-4">
        
            {auth.user ? 
            (<h2>{`${auth.user.name}'s Checkout`}</h2>) 
            : 
            (<h2>Your Checkout</h2>)
            }
            
        {cartItems.length === 0 ? (
          <p>Your checkout is empty.</p>
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
                        className="img-fluid rounded-start rounded-end shadow"
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
            <button className="btn btn-primary">Proceed to Payment</button>

          </div>
          </div>
          </>
        )}

        {cartItems.length > 0 && (
          <div className="mt-3">
            <button className="btn btn-danger me-2" onClick={clearCart}>
              Clear Checkout
            </button>
            
          </div>
        )}


      </div>

    </Layout>
  );
};

export default CheckoutPage;
