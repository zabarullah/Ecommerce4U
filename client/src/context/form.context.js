import React, { createContext, useState } from 'react';

// Create the context
export const FormContext = createContext();

// Create the provider component
export const FormProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [memorableWord, setMemorableWord] = useState('');
  const [newpassword, setNewPassword] = useState('');

  const values = {
    name,
    setName,
    email,
    setEmail,
    address,
    setAddress,
    phone,
    setPhone,
    password,
    setPassword,
    memorableWord,
    setMemorableWord,
    newpassword,
    setNewPassword
  };

  return (
    <FormContext.Provider value={values}>{children}</FormContext.Provider>
  );
};
