import React, { useContext, useState } from 'react'
import Layout from '../../../components/layout/layout.component'
import './login.styles.css'
import { FormContext } from '../../../context/form.context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const Login = () => {
  const { email, setEmail, password, setPassword } = useContext(FormContext);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

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

      console.log(`Field ${name}`, value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const res = await axios.post("/api/v1/auth/login", {
            email,
            password,
          });
        
          if (res && res.data.success) {
            console.log(res.data);
            setAlert({ type: 'success', message: res.data.message });
            navigate("/");
          } else {
            setAlert({ type: 'error', message: res.data.message });
          };
        } catch (err) {
            console.log(err);
            setAlert({ type: 'error', message: 'Oops! Something went wrong.' });
          }
      };
      

  return (
    <Layout title="Login - Ecommerce 4 U" alert={alert} setAlert={setAlert}>
       <div className="login">
        <h1>Login</h1>
        {/* {alert && <Alert type={alert.type} message={alert.message} onClose={() => handleAlertClose(setAlert)} />} */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3 form-floating">
            <input type="email" className="form-control" id="email" placeholder='Email' name="email" value={email} onChange={handleInputChange} required  />
            <label htmlFor="exampleFormControlInput">Email</label>
          </div>
          <div className="mb-3 form-floating">
            <input type="password" className="form-control" id="password" placeholder='Password' name="password" value={password} onChange={handleInputChange} required  />
            <label htmlFor="exampleFormControlInput">Password</label>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>

       </div>
    </Layout>
  )
}

export default Login;