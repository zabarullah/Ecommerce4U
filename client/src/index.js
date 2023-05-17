import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import { FormProvider } from './context/form.context';
import { AlertProvider } from './context/alert.context';
import { AuthProvider } from './context/auth.context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <AlertProvider>
      <FormProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </FormProvider>
    </AlertProvider>  
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
