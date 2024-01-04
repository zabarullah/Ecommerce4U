import React, { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import Layout from '../../components/layout/layout.component';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cartItems, removeFromCart, addToCart, removeItemFromCart,clearCart, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();
  return (
    <Layout title="Checkout">
      <div className="container mt-4">
        <h2>Your Checkout</h2>
        {cartItems.length === 0 ? (
          <p>Your checkout is empty.</p>
        ) : (
          <div className="table-responsive">
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
        )}

        {cartItems.length > 0 && (
          <div className="mt-3">
            <button className="btn btn-secondary me-2" onClick={clearCart}>
              Clear Checkout
            </button>
            {/* You can add additional buttons or elements here */}
          </div>
        )}

        <div className="mt-3">
          <h4>Total: £{getCartTotal().toFixed(2)}</h4>
          <button className="btn btn-primary">Proceed to Payment</button>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;