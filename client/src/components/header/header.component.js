import React, { Fragment } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { FaShopify } from 'react-icons/fa';
import './header.styles.css';

const Header = () => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg bg-info">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to='/' className="navbar-brand">{<FaShopify />} Ecommerce 4 U</Link>
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink to='/' className="nav-link">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to='/category' className="nav-link">Category</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to='/signup' className="nav-link">Sign Up</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to='/login' className="nav-link">Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to='/cart' className="nav-link">Cart (0)</NavLink>
                </li>
              </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  )
}

export default Header;