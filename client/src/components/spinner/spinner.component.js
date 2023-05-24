import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../layout/layout.component';
import { useAuth } from '../../context/auth.context';
import { AlertContext } from '../../context/alert.context';

const Spinner = () => {
  const [auth] = useAuth();
  const { alert, setAlert } = useContext(AlertContext);
  const [timer, setTimer] = useState(10);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!auth.token) {
      setAlert({ type: 'error', message: 'Please log in to access this page.' });
    }
  }, [auth.token, setAlert]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      navigate('/login', {
        state: location.pathname,
      });
    }
  }, [timer, navigate]);

  const handleNavigateToLogin = () => {
    navigate('/login', {
      state: location.pathname,
    });
  };

  return (
    <>
      <Layout title="Unauthorised - Ecommerce 4 U" alert={alert} setAlert={setAlert}>
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '70vh' }}>
          <p>You are being redirected in {timer} seconds</p>
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>
            Take me to{' '}
            <a href="#!" onClick={handleNavigateToLogin}>
              Login page 
            </a>
            {' '} now
          </p>
        </div>
      </Layout>
    </>
  );
};

export default Spinner;


// import React, { useContext, useEffect } from 'react';
// import Layout from '../layout/layout.component';
// import { useAuth } from '../../context/auth.context';
// import { AlertContext } from '../../context/alert.context';

// const Spinner = () => {
//     const [auth] = useAuth();
//     const { alert, setAlert } = useContext(AlertContext);
  
//     useEffect(() => {
//         // if there is no auth.token then it will set the alert parameters type and message
//         if (!auth.token) {
//             setAlert({ type: 'error', message: 'Please log in to access this page.' });
//         }
//     }, [auth.token, setAlert]); // so that it only runs unless auth or setAlert changes

//   return (
//     <>
//        <Layout title="Unauthorised - Ecommerce 4 U" alert={alert} setAlert={setAlert}> {/* passed in the propers alert and setAlert for the Layout component to show Alert. */}
//         <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '70vh' }}>
//           <div className="spinner-border text-info" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       </Layout>
//     </>
//   );
// };

// export default Spinner;
