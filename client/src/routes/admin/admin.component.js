import React from 'react'
import Layout from '../../components/layout/layout.component'
import AdminMenu from '../../components/adminMenu/adminMenu.component';
import { useAuth } from '../../context/auth.context';

const AdminDashboard = () => {
    const [auth] = useAuth();
  return (
    <Layout title="Admin Dashboard - Ecommerce 4 U">
       <div className="container-fluid m-3 p-3">
       {/* <h1> Admin Dashboard </h1>  */}
        <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                <div className="card w-75 p-4 mt-4">
                    <h5>Name: {auth?.user?.name}</h5>
                    <h5>Email: {auth?.user?.email}</h5>
                    <h5>Phone: {auth?.user?.phone}</h5>
                </div>
            </div>
        </div>
       </div>
    </Layout>
  )
}

export default AdminDashboard;