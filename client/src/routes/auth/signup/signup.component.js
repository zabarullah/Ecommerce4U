import React, { useContext} from 'react';
import Layout from '../../../components/layout/layout.component';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FormContext } from '../../../context/form.context';
import { AlertContext } from '../../../context/alert.context';
import './signup.styles.css';

const SignUp = () => {
    const { name, setName, email, setEmail, password, setPassword, phone, setPhone, address, setAddress, memorableWord, setMemorableWord } = useContext(FormContext);
    const { setAlert } = useContext(AlertContext); // to set the Alert type and message (alert displayed inside the Layout component)
    const navigate = useNavigate();
    
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
        case 'memorableWord':
          setMemorableWord(value);
          break;
        default:
          break;
      }
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
            memorableWord,
          });
        
          if (res && res.data.success) {
            setAlert({ type: 'success', message: res.data.message });
            navigate('/login', { state: { type: 'success', message: res.data.message } });

            // Clear the form fields
            setName('');
            setEmail('');
            setPassword('');
            setPhone('');
            setAddress('');
            setMemorableWord('');
          } else {
            setAlert({ type: 'error', message: res.data.message });
          };
        } catch (err) {
            console.log(err);
            setAlert({ type: 'error', message: 'Oops! Something went wrong.' });
          }
      };
      

  return (
    <Layout title="Sign Up - Ecommerce 4 U">
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="signUp">
              <h1 className="mb-4">Sign Up</h1>
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
                <div className="mb-3 form-floating">
                  <input type="password" className="form-control" id="memorableWord" placeholder='Memorable secret word' name="memorableWord" value={memorableWord} onChange={handleInputChange} required  />
                  <label htmlFor="exampleFormControlInput">Memorable Secret Word</label>
                </div>
                <div className="d-grid gap-2 col-12 mx-auto">
                  <button type="submit" className="btn btn-info text-white">Submit</button>
                </div>
              </form>

            </div>
          </div>
        </div>    
      </div>      
    </Layout>
  )
}

export default SignUp;