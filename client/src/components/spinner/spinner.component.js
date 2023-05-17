import React, { useContext, useEffect } from 'react';
import Layout from '../layout/layout.component';
import { useAuth } from '../../context/auth.context';
import { AlertContext } from '../../context/alert.context';

const Spinner = () => {
    const [auth] = useAuth();
    const { alert, setAlert } = useContext(AlertContext);
  
    useEffect(() => {
        // if there is no auth.token the it will set the alert parameters type and message
        if (!auth.token) {
            setAlert({ type: 'error', message: 'Please log in to access this page.' });
        }
    }, [auth.token, setAlert]); // so that it only runs unless auth or setAlert changes

  return (
    <>
       <Layout title="Unauthorised - Ecommerce 4 U" alert={alert} setAlert={setAlert}> {/* passed in the propers alert and setAlert for the Layout component to show Alert. */}
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '70vh' }}>
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Spinner;
