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
import AdminRoute from './routes/admin/adminRoute.component';
import AdminDashboard from './routes/admin/admin.component';
import CreateCategory from './routes/admin/createCategory.component';
import CreateProduct from './routes/admin/createProduct.component';
import Users from './routes/admin/users.component';
import Profile from './routes/user/profile';
import Orders from './routes/user/orders';
import Products from './routes/admin/products.component';
import UpdateProduct from './routes/admin/updateProduct.component';
import ProductPage from './routes/productPage/productPage.component';
import CategoriesPage from './routes/categories/categoriesPage.component';
import Checkout from './routes/checkout/checkout.component';

function App() {
  return (
    <>
      <Routes>
        <Route exact path='/' element={<HomePage />}/>
        <Route exact path='/categories' element={<CategoriesPage />}/>
        <Route exact path='/categories/:categorySlug?' element={<HomePage />}/>
        
        <Route exact path='/dashboard' element={<PrivateRoute />}> {/*protected Route */}
          <Route exact path='user' element={<Dashboard />}/>
            <Route exact path='user/profile' element={<Profile />}/>
            <Route exact path='user/orders' element={<Orders />}/>
        </Route>
        
        <Route exact path='/dashboard' element={<AdminRoute />}> {/*protected Route */}
          <Route exact path='admin' element={<AdminDashboard />}/>
            <Route exact path='admin/create-category' element={<CreateCategory />}/>
            <Route exact path='admin/create-product' element={<CreateProduct />}/>
            <Route exact path='admin/product/:slug' element={<UpdateProduct />}/>
            <Route exact path='admin/products' element={<Products />}/>
            <Route exact path='admin/users' element={<Users />}/>
        </Route>

        <Route exact path='/aboutus' element={<AboutUs />}/>
        <Route exact path='/contact' element={<Contact />}/>
        <Route exact path='/policy' element={<Policy />}/>
        <Route exact path='/signup' element={<SignUp />}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/forgot-my-password' element={<ForgotMyPassword />}/>
        <Route exact path='/product/:slug' element={<ProductPage />}/>
        <Route exact path='/checkout' element={<Checkout />}/>

        <Route exact path='/*' element={<PageNotFound />}/>
      </Routes>


    </>
  );
}

export default App;
