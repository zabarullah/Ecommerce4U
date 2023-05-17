import React from 'react'
import Layout from '../../components/layout/layout.component';
import { useAuth } from '../../context/auth.context';

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout title="Home Page - Ecommerce 4 U">
        <h1> Homepage </h1>  
        <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>

  )
}

export default HomePage;