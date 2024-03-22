import React from 'react';
import { Link } from 'react-router-dom';
import './footer.styles.css';
import { FaShopify } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="d-flex flex-column justify-content-center bg-info text-light link-white p- footer-shadow">
        <div className='d-flex justify-content-center'>
          <h1 className='brand'><FaShopify size={24} /> Ecommerce 4 U</h1>

        </div>
        <div className='d-flex justify-content-center m-0'>
          <p>
              <Link to='/aboutus' className='footer-link'>About Us</Link>| 
              <Link to='/contact' className='footer-link'>Contact</Link>| 
              <Link to='/policy' className='footer-link'>Privacy Policy</Link>
          </p>
        </div>
    </div>
  )
}

export default Footer;