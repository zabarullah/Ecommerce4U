import React from 'react'
import Layout from '../../components/layout/layout.component'
import UserMenu from '../../components/UserMenu/userMenu.component';
import { useAuth } from '../../context/auth.context';

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title="User Dashboard - Ecommerce 4 U">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
              <UserMenu />
          </div>
          <div className="col-md-9">
              <div className="card w-75 p-4 mt-4">
                <h5>{auth?.user?.name}</h5>
                <h5>{auth?.user?.email}</h5>
                <h5>{auth?.user?.address}</h5>
              </div>
          </div>
        </div>        
      </div>
    </Layout>
  )
}

export default Dashboard;