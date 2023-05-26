import React, { useContext} from 'react';
import Layout from '../../../components/layout/layout.component';
import './forgotPassword.styles.css';
import { FormContext } from '../../../context/form.context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AlertContext } from '../../../context/alert.context';

const ForgotMyPassword = () => {
  const { email, setEmail, memorableWord, setMemorableWord, newpassword, setNewPassword,  } = useContext(FormContext);
  const { setAlert } = useContext(AlertContext);// to set the Alert type and message (alert displayed inside the Layout component)

  const navigate = useNavigate();

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      switch (name) {
        case 'email':
          setEmail(value);
          break;
        case 'memorableWord':
          setMemorableWord(value);
          break;
        case 'newPassword':
          setNewPassword(value);
          break;
        default:
          break;
      }

    //   console.log(`Field ${name}`, value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log({email, memorableWord, newpassword});
      
      try {
        const res = await axios.post("/api/v1/auth/forgot-my-password", {
            email,
            memorableWord,
            newpassword,
          });
        
          if (res && res.data.success) {
            setAlert({ type: 'success', message: res.data.message });

            //location.state will redirect to the page it came from if it exists otherwise to homepage, the location state is passed in the spinner component. The state has been passed in to navigate function, so that it can be used by the Alert component to alert using this data when page navigates to another page
            navigate("/login", { 
                state: { 
                    type: 'success', 
                    message: res.data.message, 
                    path: "/"
                } 
            });
          } else {
            setAlert({ type: 'error', message: res.data.message });
          };
        } catch (err) {
            console.log(err);
            setAlert({ type: 'error', message: 'Oops! Something went wrong.' });
          }
      };
      

  return (
    <Layout title="Forgot Password - Ecommerce 4 U" alert={alert} setAlert={setAlert}>
       <div className="forgot-password">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 form-floating">
            <input type="email" className="form-control" id="email" placeholder='Email' name="email" value={email} onChange={handleInputChange} required  />
            <label htmlFor="exampleFormControlInput">Email</label>
          </div>
          <div className="mb-3 form-floating">
            <input type="password" className="form-control" id="memorableWord" placeholder='Your Memorable Secret Word' name="memorableWord" value={memorableWord} onChange={handleInputChange} required  />
            <label htmlFor="exampleFormControlInput">Your Memorable Secret Word</label>
          </div>
          <div className="mb-3 form-floating">
            <input type="password" className="form-control" id="newPassword" placeholder='New Password' name="newPassword" value={newpassword} onChange={handleInputChange} required  />
            <label htmlFor="exampleFormControlInput">New Password</label>
          </div>
          <div className="d-grid gap-2 col-12 mx-auto">
            <button type="submit" className="btn btn-info text-white">Reset</button>
          </div>
        </form>
       </div>
    </Layout>
  )
}

export default ForgotMyPassword;