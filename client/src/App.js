import {Routes, Route} from 'react-router-dom'
import HomePage from './routes/homepage/homePage.component';
import AboutUs from './routes/aboutUs/aboutUs.component';
import Contact from './routes/contact/contact.component';
import Policy from './routes/policy/policy.component';
import PageNotFound from './routes/pageNotFound/pageNotFound.component';
import SignUp from './routes/auth/signup/signup.component';
import Login from './routes/auth/login/login.component';
import Dashboard from './routes/user/dashboard.component';
import PrivateRoute from './routes/private/privateRoute.component';
import ForgotMyPassword from './routes/auth/forgotPassword/forgotPassword.component';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<HomePage />}/>
        <Route exact path='/dashboard' element={<PrivateRoute />}> {/*protected Route */}
          <Route exact path='' element={<Dashboard />}/>
        </Route>
        <Route exact path='/aboutus' element={<AboutUs />}/>
        <Route exact path='/contact' element={<Contact />}/>
        <Route exact path='/policy' element={<Policy />}/>
        <Route exact path='/signup' element={<SignUp />}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/forgot-my-password' element={<ForgotMyPassword />}/>
        <Route exact path='/*' element={<PageNotFound />}/>
      </Routes>


    </>
  );
}

export default App;
