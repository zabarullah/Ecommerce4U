import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { FormContext } from '../../context/form.context.js';
import { AlertContext } from '../../context/alert.context';
import Layout from '../../components/layout/layout.component';
import UserMenu from '../../components/UserMenu/userMenu.component';
import Button from '../../components/button/button.component';
import { useAuth } from '../../context/auth.context';

const Profile = () => {
  const { name, setName, email, setEmail, phone, setPhone, address, setAddress, password, setPassword } = useContext(FormContext);
  const [auth, setAuth] = useAuth();
  const { setAlert } = useContext(AlertContext);


  useEffect(() => {
        //Get user details for the authenticated user
        const user = auth?.user;
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
        setAddress(user.address);
    //eslint-disable-next-line
  }, [auth?.user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        '/api/v1/auth/update-profile',
        {
          name,
          email,
          password,
          phone,
          address,
        },
        {
          headers: {
            Authorization: auth.token, 
          },
        }
      );

      if (response.data?.success) {
        setAlert({ type: 'success', message: response.data.message });
        //updated the auth with the new user details and spreading the auth we have
        setAuth({ ...auth, user: response.data?.updatedUser });
        //updating the localstorage so that the app has the same auth across the app components
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = response.data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));

      } else {
        setAlert({ type: 'error', message: response.data.message });
      }
    } catch (error) {
      console.error(error);
      setAlert({ type: 'error', message: error.response.data.message });
    }
  };

  return (
    <Layout title="Your Profile" alert={alert} setAlert={setAlert}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>Your Profile</h1>
            <form onSubmit={handleUpdateProfile} className='w-50'>
              {/* Add your form inputs here similar to the CreateProduct page */}
              <div className="mb-3 form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter Your Name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="mb-3 form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter Your New Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="mb-3 form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="Enter Your New Address"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  
                />
                <label htmlFor="address">Address</label>
              </div>
              <div className="mb-3 form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder="Enter Your New Phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  
                />
                <label htmlFor="phone">Phone</label>
              </div>
              <div className="mb-3 form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Your New Password"
                  />
                  <label htmlFor="phone">Password</label>
                </div>
              <div className="d-grid gap-2 col-12 mx-auto">
                <Button type="submit">Update Profile</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
