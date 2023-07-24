import React from 'react'
import Layout from '../../components/layout/layout.component'
import AdminMenu from '../../components/adminMenu/adminMenu.component';
import { useAuth } from '../../context/auth.context';

const AdminDashboard = () => {
    const [auth] = useAuth();
  return (
    <Layout title="Admin Dashboard - Ecommerce 4 U">
       <h1> Admin Dashboard </h1> 
       <div className="container-fluid m-3 p-3">
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                <div className="card w-auto m-3 p-3">
                    <h3>Name: {auth?.user?.name}</h3>
                    <h3>Email: {auth?.user?.email}</h3>
                    <h3>Phone: {auth?.user?.phone}</h3>
                </div>
            </div>
        </div>
       </div>
    </Layout>
  )
}

export default AdminDashboard;