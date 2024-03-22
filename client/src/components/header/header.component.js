import React, { Fragment, useContext } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth.context';
import { FaShopify, FaShoppingCart } from 'react-icons/fa';
import './header.styles.css';
import { AlertContext } from '../../context/alert.context';
import useCategoryHook from '../../hooks/useCategoryHook';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/cart.context';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const { setAlert } = useContext(AlertContext); // to set the Alert type and message (alert displayed inside the Layout component)
  const { categories } = useCategoryHook(); // categories brought in from the useCategoryHook
  const { cartItems, getTotalQuantity, getCartTotal } = useContext(CartContext);
  const navigate = useNavigate();
  
  //this will help reset the auth state back to default (user not logged in) when we use this helper function on the onChange event handler in link Logout
  const handleLogout = () => {
    setAuth({
        ...auth,
        user: null, 
        token: ""
    });
    localStorage.removeItem('auth');
    setAlert({ type: 'success', message: "Logged out Successfully" });
  };
  

  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg bg-info">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to='/' className="navbar-brand">{<FaShopify size={24} />} Ecommerce 4 U</Link>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item me-2">
                  <NavLink to='/' className="nav-link">Home</NavLink>
                </li>
                
                <li className="nav-item dropdown me-2">
                  <NavLink
                    className='nav-link'
                    to='/categories'
                    data-bs-toggle= 'dropdown'
                  >
                  Categories
                  </NavLink>
                      <ul className='dropdown-menu bg-info me-2'>
                        <li>
                            <Link className='dropdown-item nav-link' to={`/categories`}>
                              All Categories
                            </Link>  
                        </li>
                        {/* Display categories when they are loaded */}
                        {categories?.map(category => (
                          <button
                          key={category._id}
                          onClick={() => navigate('/', { state: { checkedCategories: [category._id] } })}
                          className='dropdown-item nav-link'
                          >
                            {category.name}
                          </button>
                            ))}
                      </ul>
                </li>
                {
                !auth.user? (
                  <>
                  <li className="nav-item me-2">
                  <NavLink to='/signup' className="nav-link">Sign Up</NavLink>
                  </li>
                  <li className="nav-item me-2">
                    <NavLink to='/login' className="nav-link">Login</NavLink>
                  </li>
                  </>
                ) : (
                  <>
                  <li className="nav-item dropdown me-2">
                    <NavLink className="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      {auth?.user.name}
                    </NavLink>
                    <ul className="dropdown-menu nav-item bg-info me-2 dropdown-menu-end">
                      <li><NavLink to={`/dashboard/${
                        auth?.user?.role === 1 ? 'admin' : 'user'
                        }`} className="dropdown-item">Dashboard</NavLink></li>
                      <li><NavLink to='/login' className="dropdown-item " onClick={handleLogout}>Logout</NavLink></li>
                    </ul>
                  </li>
                  </>
                )
                }
                <li className="nav-item dropdown me-2">
                <NavLink
                  className="nav-link"
                  to="/cart"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaShoppingCart size={24} />
                  <span className="cart-icon">
                    {getTotalQuantity() > 0 && (
                      <span className="cart-count">{getTotalQuantity()}</span>
                    )}
                  </span>
                </NavLink>
                <ul className="dropdown-menu dropdown-menu-end cart-dropdown bg-info" aria-labelledby="navbarDropdown">
                  {cartItems.length === 0 ? (
                    <li>
                      <p className="dropdown-item">Your cart is empty.</p>
                    </li>
                  ) : (
                    <>
                      <div className="cart-scrollable">
                        {cartItems.map((item) => (
                          <li key={item._id} 
                          className="dropdown-item cart-item" 
                          style={{cursor: 'pointer' }}
                          onClick={() => navigate(`/product/${item.slug}`)}
                          >
                            <div className="cart-item-image">
                              <img
                                src={`/api/v1/product/product-photo/${item._id}`}
                                alt={item.name}
                                className="img-fluid rounded-start rounded-end shadow product-img"
                                width="50px"
                              />
                            </div>
                            <div className="cart-item-details">
                              <p className="item-name">{item.name}</p>
                              <p className="item-quantity">Quantity: {item.quantity}</p>
                            </div>
                          </li>
                        ))}
                      </div>
                      <li className="dropdown-divider"></li>
                      <li className="dropdown-item cart-total text-centre">
                        <strong>Total: £{getCartTotal().toFixed(2)}</strong>
                      </li>
                      <li>
                        <button className="btn btn-primary go-to-checkout  btn-block" onClick={() => navigate('/checkout')}>
                          Go to Checkout
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </li>
              </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  )
}

export default Header;