import React, { useContext, useState } from 'react'
import Layout from '../../../components/layout/layout.component'
import './signup.styles.css'
import { FormContext } from '../../../context/form.context'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const SignUp = () => {
  const { name, setName, email, setEmail, password, setPassword, phone, setPhone, address, setAddress } = useContext(FormContext);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      switch (name) {
        case 'name':
          setName(value);
          break;
        case 'email':
          setEmail(value);
          break;
        case 'password':
          setPassword(value);
          break;
        case 'phone':
          setPhone(value);
          break;
        case 'address':
          setAddress(value);
          break;
        default:
          break;
      }
      // if (name) {
      //   // This will simply be similar to manually typing setName(e.target.value) on each onChange event handler)
      //   const setter = `set${name.charAt(0).toUpperCase()}${name.slice(1)}`;
      //   eval(`${setter}('${value}')`);
      // }
      console.log(`Field ${name}`, value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const res = await axios.post("/api/v1/auth/signup", {
            name,
            email,
            password,
            phone,
            address,
          });
        
          if (res && res.data.success) {
            console.log(res.data);
            setAlert({ type: 'success', message: res.data.message });
            navigate("/login");
          } else {
            setAlert({ type: 'error', message: res.data.message });
          };
        } catch (err) {
            console.log(err);
            setAlert({ type: 'error', message: 'Oops! Something went wrong.' });
          }
      };
      

  return (
    <Layout title="Sign Up - Ecommerce 4 U" alert={alert} setAlert={setAlert}>
       <div className="signUp">
        <h1>Sign Up</h1>
        {/* {alert && <Alert type={alert.type} message={alert.message} onClose={() => handleAlertClose(setAlert)} />} */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3 form-floating">
            <input type="text" className="form-control" id="name" placeholder='Name' name="name" value={name} onChange={handleInputChange} required />
            <label htmlFor="exampleFormControlInput">Name</label>
          </div>
          <div className="mb-3 form-floating">
            <input type="email" className="form-control" id="email" placeholder='Email' name="email" value={email} onChange={handleInputChange} required  />
            <label htmlFor="exampleFormControlInput">Email</label>
          </div>
          <div className="mb-3 form-floating">
            <input type="text" className="form-control" id="address" placeholder='Address' name="address" value={address} onChange={handleInputChange} required  />
            <label htmlFor="exampleFormControlInput">Address</label>
          </div>
          <div className="mb-3 form-floating">
            <input type="text" className="form-control" id="Phone" placeholder='Phone' name="phone" value={phone} onChange={handleInputChange} required  />
            <label htmlFor="exampleFormControlInput">Phone</label>
          </div>
          <div className="mb-3 form-floating">
            <input type="password" className="form-control" id="password" placeholder='Password' name="password" value={password} onChange={handleInputChange} required  />
            <label htmlFor="exampleFormControlInput">Password</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>

       </div>
    </Layout>
  )
}

export default SignUp;