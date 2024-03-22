import React, { useContext} from 'react';
import Layout from '../../../components/layout/layout.component';
import './login.styles.css';
import { FormContext } from '../../../context/form.context';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AlertContext } from '../../../context/alert.context';
import { useAuth } from '../../../context/auth.context';

const Login = () => {
  const { email, setEmail, password, setPassword } = useContext(FormContext);
  const { setAlert } = useContext(AlertContext);// to set the Alert type and message (alert displayed inside the Layout component)
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.state?.path || "/";
  console.log("Path before navigate:", path);
  console.log("Location state:", location.state);


    const handleInputChange = (e) => {
      const { name, value } = e.target;
      switch (name) {
        case 'email':
          setEmail(value);
          break;
        case 'password':
          setPassword(value);
          break;
        default:
          break;
      }

    //   console.log(`Field ${name}`, value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const res = await axios.post("/api/v1/auth/login", {
            email,
            password,
          });
        
          if (res && res.data.success) {
            // console.log(res.data);
            setAlert({ type: 'success', message: res.data.message });
            setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token
            })
            //console.log("Login Component state: ",location.state);
            //location.state will redirect to the page it came from if it exists otherwise to homepage, the location state is passed in the spinner component. The state has been passed in to navigate function, so that it can be used by the Alert component to alert using this data when page navigates to another page
            navigate(path || "/", { 
                state: { 
                    type: 'success', 
                    message: res.data.message 
                } 
            });
            // Clear the form fields
            setEmail('');
            setPassword('');
          } else {
            setAlert({ type: 'error', message: res.data.message });
          };
        } catch (err) {
            console.log(err);
            setAlert({ type: 'error', message: 'Oops! Something went wrong.' });
          }
      };
      

  return (
    <Layout title="Login - Ecommerce 4 U">
      <div className="container">
        <div className="row mt-3">
          <div className="col-md-12 login">
            <div className="login ">
              <h1>Login</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3 form-floating">
                  <input type="email" className="form-control" id="email" placeholder='Email' name="email" value={email} onChange={handleInputChange} required  />
                  <label htmlFor="exampleFormControlInput">Email</label>
                </div>
                <div className="mb-3 form-floating">
                  <input type="password" className="form-control" id="password" placeholder='Password' name="password" value={password} onChange={handleInputChange} required  />
                  <label htmlFor="exampleFormControlInput">Password</label>
                </div>
                <div className="d-grid gap-2 col-12 mx-auto">
                  <button type="submit" className="btn btn-info text-white">Login</button>
                  <button type="button" className="btn btn-info text-white"onClick={() => {navigate('/forgot-my-password')}}>Forgot my Password</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Login;