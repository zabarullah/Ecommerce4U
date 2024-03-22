import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminMenu from '../../components/adminMenu/adminMenu.component';
import Layout from '../../components/layout/layout.component';
import { useAuth } from '../../context/auth.context';
import { AlertContext } from '../../context/alert.context';

const AdminOrders = () => {
  const [status, setStatus] = useState(['Not Processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth(); // Get the Auth state
  const { setAlert } = useContext(AlertContext);// to set the Alert type and message (alert displayed inside the Layout component)
  const navigate = useNavigate();

  const getOrders = async () => {
    try {
      const response = await axios.get('/api/v1/order/get-all-orders', {
        headers: {
          Authorization: auth.token
        },
      });
      setOrders(response.data.orders);
      setAlert({type: 'success', message: response.data.message})
    } catch (error) {
      console.log(error);
      setAlert({type: 'error', message: error.response.data.message})  
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async(orderId, value) => {
    try {
      const response = await axios.put(`/api/v1/order/order-status/${orderId}`, 
      {
        status: value,
      },
      {
        headers: {
          Authorization: auth.token,
        },
      });
      setAlert({ type: 'success', message: response.data.message });
      setTimeout(() => {
        getOrders();
      }, 3000);
  
    } catch (error) {
      console.log(error);
      setAlert({type: 'error', message: error.response.data.message}) 
    }
  }

  return (
  
    <Layout title='All Orders Data'>
      <div className="container-fluid m-3 p-3">
        <div className="row dashboard">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>All Orders</h1>
              {orders && orders.map((order, i) => (
              <div key={order._id} className="border shadow mb-3 w-75">
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
                      <td>
                        { //order.status
                          <select 
                            className="form-select mb-3" 
                            onChange={(e) => handleChange(order._id, e.target.value)}
                            defaultValue={order?.status}
                          >
                            {
                              status.map((s, i) => (
                                <option key={i} value={s}>
                                  {s}
                                </option>
                              ))
                            }
                          </select>
                        }
                      </td>
                      <td>{order.user.name}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>{order.payment.success === true ? "Success" : "Failed"}</td>
                      <td>{order.products.reduce((acc, cur) => acc + cur.quantity, 0)}</td>
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
  )
}

export default AdminOrders;