import { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth.context';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../components/spinner/spinner.component';

// will give access to protected routes only if a user auth exists, and is Admin and an auth.token exists.
const AdminRoute = () => {
  const [ok, setOk] = useState(false); // local state ok is set as per the respose from the server, inorder to render the correct component
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get('/api/v1/auth/admin-auth', {
          headers: {
            Authorization: auth?.token,
          },
        });

        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.log(error);
        setOk(false);
      }
    };

    // Check if there is auth and a token for that auth, then run the authCheck function
    if (auth?.token) {
      authCheck();
    }
  }, [auth?.token]);

  if (ok) {
    return <Outlet />;
  }

  return <Spinner path=""/>; // Replace with your spinner component and pass the path to homepage
};

export default AdminRoute;