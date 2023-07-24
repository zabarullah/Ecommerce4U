import React from 'react'
import Layout from '../../components/layout/layout.component';
import AdminMenu from '../../components/adminMenu/adminMenu.component';

const Users = () => {
  return (
    <Layout title={"Dashboard- All Users"}>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1>All Users Page</h1>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Users;