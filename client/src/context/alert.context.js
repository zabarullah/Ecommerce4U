import React, { createContext, useState, useEffect } from 'react';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => {
        setAlert(null);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [alert]);

  const removeAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ alert, setAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

