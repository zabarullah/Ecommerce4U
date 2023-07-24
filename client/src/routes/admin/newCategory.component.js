import React from 'react'
import Layout from '../../components/layout/layout.component';
import AdminMenu from '../../components/adminMenu/adminMenu.component';

const NewCategory = () => {
  return (
    <Layout title={"Dashboard- New Category"}>
        <div className="container-fluid m-3 p-3">
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu />
                </div>
                <div className="col-md-9">
                    <h1>New Category Page</h1>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default NewCategory;