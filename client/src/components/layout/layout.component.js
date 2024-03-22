import React from 'react'
import Header from '../header/header.component';
import Footer from '../footer/footer.component';
import Alert from './../alert/alert.component';

import './layout.styles.css'

import {Helmet} from "react-helmet";

const Layout = ({children, description, keywords, author, title}) => {
  return (
    <>
    <div className="wrapper">
      <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
          <title>{title}</title>
      </Helmet>
      <Header />
        <main className='content'> 
          {children} 
          {<Alert />}
        </main>
      <Footer />
    </div>
    </>
  )
}

Layout.defaultProps = {
  title: "Ecommerce 4 U - Shop now",
  description: "Discounted products",
  keywords: "cheap, discount, sale, half price",
  author: "Zabar Ullah",
}

export default Layout;