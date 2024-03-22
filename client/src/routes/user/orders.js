import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/layout/layout.component';
import UserMenu from '../../components/UserMenu/userMenu.component';
import { useAuth } from '../../context/auth.context';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [totalItems, setTotalItems] = useState(0); // State to hold the total item count
  const [auth] = useAuth(); // Get the Auth state
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get('/api/v1/order/get-orders', {
          headers: {
            Authorization: auth.token
          },
        });
        setOrders(response.data.orders);
      //  console.log('Orders from backend', response.data);

        // Calculate the total item count
        let totalCount = 0;
        response.data.orders.forEach(order => {
          order.products.forEach(product => {
            totalCount += product.quantity;
          });
        });
        setTotalItems(totalCount);
      } catch (error) {
        console.log(error);
      }
    };
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className='text-center'>Your Orders</h1>
            {orders && orders.map((order, i) => (
              <div key={order._id} className="border shadow mb-3">
                <table className='table'>
                  <thead>
                    <tr>
                      <th scope='col'>Order #</th>
                      <th scope='col'>Status</th>
                      <th scope='col'>User</th>
                      <th scope='col'>Date</th>
                      <th scope='col'>Payment</th>
                      <th scope='col'>Total Products</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{order.status}</td>
                      <td>{order.user.name}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>{order.payment.success === true ? "Success" : "Failed"}</td>
                      <td>{totalItems}</td>
                      
                    </tr>
                  </tbody>
                </table>

                <table className="table table-hover">
                <thead>
                    <tr style={{ borderBottom: '2px solid #dee2e6' }}>
                    <th scope="col" style={{ width: '75px'}}>Product</th>
                    <th scope="col" className="flex-grow-1 mx-2">Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {console.log('Checking user orders placed data: ',order.products)} */}
                    {order.products.map((item, i )=> (
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
                            <span>{item.quantity}</span>
                        </div>
                        </td>
                        <td style={{ width:'275px',  verticalAlign: 'middle' }}>£{item.price*item.quantity}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
