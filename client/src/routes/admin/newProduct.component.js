import React from 'react'
import Layout from '../../components/layout/layout.component';
import AdminMenu from '../../components/adminMenu/adminMenu.component';

const NewProduct = () => {
  return (
    <Layout title={"Dashboard- New Product"}>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1>New Product Page</h1>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default NewProduct;