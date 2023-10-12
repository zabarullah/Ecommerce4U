import { createContext, useContext, useState,useEffect } from 'react';

const AuthContext = createContext(undefined);

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState( () => {
        // gets local auth state from local storage
        const storedAuth = localStorage.getItem('auth');
        // if auth state exists in local storage, then it will parse it and use the auth state otherwise it will be set to default user: null etc
//        console.log('authProvider kicked in: ', storedAuth);
        return storedAuth ? JSON.parse(storedAuth) : { user: null, token: "" };
    });

    useEffect( () => {
        //updates auth in the local storage when auth state changes
        localStorage.setItem('auth', JSON.stringify(auth))
    }, [auth]);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>
    )
};

//Custom Hook
export const useAuth = () => useContext(AuthContext);

