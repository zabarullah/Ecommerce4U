import React from 'react';
import { Link } from 'react-router-dom';
import './footer.styles.css';

const Footer = () => {
  return (
    <div className="bg-info text-light link-white p-3 footer-shadow">
        <h1 className='text-center'>Ecommerce 4 U</h1>
        <h6 className='text-center'>All rights reserved &copy;</h6>
        <p className='text-center'>
            <Link to='/aboutus' className='footer-link'>About Us</Link>| 
            <Link to='/contact' className='footer-link'>Contact</Link>| 
            <Link to='/policy' className='footer-link'>Privacy Policy</Link>
        </p>
    </div>
  )
}

export default Footer;